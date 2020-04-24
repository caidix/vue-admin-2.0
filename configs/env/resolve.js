const resolve = require('./resolve.json');
const env = require('./env');
const path = require('path');

class ResolveContainer {
  constructor() {
    this.home = process.cwd();// 运行node环境所在的文件地址
    this.extras = new Map();
  }
  cd(home) {
    this.home = home;// 指定进入的地址
  }
  getEntry() {
    return path.join(this.home, resolve.src, resolve.entry) // xxxx/src/pages =>这里取得的是入口的门槛，与env.js中的entry组合即是多文件打包的地址.
  }
  getModule() {
    return path.join(this.home, resolve.src, resolve.module)
  }
  getNodeModules(modules = []) {
    return modules.map(module => path.join(this.home, resolve.nodeModules, module));
  }
  // getDist() {
  //   return env.getExtra('dist') || path.join(this.home, resolve.dist); // 设置打包地址， 可以在webpack配置时，output中引入获取打包路径
  // }
  // register(name, location) {
  //   this.extras.set(name, location);  //重置或自定义dist打包的地址。getDist会从中获取
  // }
  // getExtra(name) {
  //   return path.join(this.home, this.extras.get(name));
  // }
  // getStatic() {
  //   return path.join(this.getDist(), resolve.static);  // 获取打包后静态文件的存储路劲，或是设置打包后静态文件的存储路劲
  // }
}
exports = module.exports = new ResolveContainer()