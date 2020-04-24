import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)
const moduleFile = require.context('./modules', true, /.js$/)

const modules = moduleFile.keys().reduce((modules, modulePath) => {
  // .* 单个字符匹配任意次，即贪婪匹配。
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 当上下文环境传入某个文件的键时，就会得到一个标准的es module
  const value = moduleFile(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
const store = new Vuex.Store({
  modules,
  getters
})

export default store