import http from '@/utils/http.js'

const addGather = (params, config = {}) => {
  return http.request({
    url: '/admin/gather/add',
    method: 'get',
    params
  })
}

const editGather = (data, config = {}) => {
  return http.request({
    url: '/admin/gather/edit',
    method: 'post',
    data
  })
}

const getGather = (data, config = {}) => {
  return http.request({
    url: '/admin/gather/list',
    method: 'get'
  })
}

const delGather = (params, config = {}) => {
  return http.request({
    url: '/admin/gather/del',
    method: 'get',
    params
  })
}

export default {
  getGather,
  addGather,
  editGather,
  delGather
}