import http from '@/utils/http.js'

const addTag = (data, config = {}) => {
  return http.request({
    url: '/admin/tags',
    method: 'post',
    data
  })
}

const editTag = (data, config = {}) => {
  return http.request({
    url: '/admin/tag/edit',
    method: 'post',
    data
  })
}

const getTag = (params, config = {}) => {
  return http.request({
    url: '/admin/tags',
    method: 'get',
    params
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