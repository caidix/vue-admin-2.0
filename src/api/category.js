import http from '@/utils/http.js'

const addCategory = (params, config = {}) => {
  return http.request({
    url: '/admin/category/add',
    method: 'get',
    params
  })
}

const editCategory = (data, config = {}) => {
  return http.request({
    url: '/admin/category/edit',
    method: 'post',
    data
  })
}

const getCategory = (data, config = {}) => {
  return http.request({
    url: '/admin/category/list',
    method: 'get'
  })
}

const delCategory = (params, config = {}) => {
  return http.request({
    url: '/admin/category/del',
    method: 'get',
    params
  })
}

export default {
  getCategory,
  addCategory,
  editCategory,
  delCategory
}