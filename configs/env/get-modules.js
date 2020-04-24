
const resolve = require('./resolve');
const path = require('path');
const glob = require('glob');
const getFullNamespace = (rootDir = __dirname, target) => {
  const pattern = path.resolve(rootDir, target);   // 进入入口(xxx/src/pages/**/**/entry.js)
  const files = glob.sync(path.resolve(pattern));  // 查询是否拥有改入口 一个是匹配成功后的结果会返回一个数组，如果没有匹配上不会报错会返回一个空数组，一个是失败后的结果。
  let namespace = {};
  files.forEach((file) => {   //如若找到了所有的入口文件，则循环将文件名，路径存入json字串namespace中
    const relativePath = path.relative(rootDir, file);
    const relativeDir = path.dirname(relativePath).split(/\\/g).join('/');
    namespace[relativeDir] = file;
  });
  return namespace;
};


/**
* 通过module限定查找范围
* 通过fileName限定查找名字
*/
exports = module.exports = (fileName, module) => {
  const pattern = path.join(module, fileName);  // pattern = **/**/entry.js 相对入口
  const modules = getFullNamespace(resolve.getEntry(), pattern);  // (xxx/src/pages, **/**/entry.js)
  const modulesNotFound = Object.keys(modules).length === 0;
  if (modulesNotFound) {
    const fullPath = path.join(resolve.getEntry(), pattern);
    throw new Error(`module not found about ${fullPath}`);
  } else {
    return modules;   //无文件入口则报错，有则返回入口数组
  }
};