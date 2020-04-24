import http from '@/utils/http.js'

const addTag = (params, config = {}) => {
  return http.request({
    url: '/admin/tag/add',
    method: 'get',
    params
  })
}

const editTag = (data, config = {}) => {
  return http.request({
    url: '/admin/tag/edit',
    method: 'post',
    data
  })
}

const getTag = (data, config = {}) => {
  return http.request({
    url: '/admin/tag/list',
    method: 'get'
  })
}

const delTag = (params, config = {}) => {
  return http.request({
    url: '/admin/tag/del',
    method: 'get',
    params
  })
}

export default {
  getTag,
  addTag,
  editTag,
  delTag
}