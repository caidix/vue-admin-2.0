import http from '@/utils/http.js'

const createClassic = (params = {}, config = {}) => {
  return http.request({
    method: 'get',
    url: '/applet/classic/create',
    params,
    config
  })
}
const queryClassic = (params = {}, config = {}) => {
  return http.request({
    method: 'get',
    url: '/applet/classic/query',
    params,
    config
  })
}

export default {
  createClassic,
  queryClassic
}