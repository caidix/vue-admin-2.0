const env = require('../env/env')
const getModule = require('../env/get-modules');
const modules = getModule(env.getEntry(), env.getModule())
let pages = {}
Object.keys(modules).forEach(fileName => {
  pages[fileName] = {
    entry: modules[fileName],
    template: "public/index.html",
    filename: process.env.NODE_ENV === 'development' ? `${fileName}.html` : `${fileName}.html`,
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', fileName]
  }
})
exports = module.exports = pages;