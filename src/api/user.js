import http from '@/utils/http.js'

const getUserList = (data) => {
  return http.request({
    method: 'post',
    url: '/user/userList',
    data
  })
}

const login = (data) => {
  return http.request({
    method: 'POST',
    url: '/auth/login',
    data
  })
}

const list = (data) => {
  return http.request({
    method: 'get',
    url: '/user/list',
    data
  })
}

const register = (data) => {
  return http.request({
    method: 'post',
    url: '/auth/register',
    data
  })
}

const delUser = (data) => {
  return http.request({
    method: 'post',
    url: '/user/delUser',
    data
  })
}

const findOne = (data) => {
  return http.request({
    method: 'get',
    url: '/auth/user',
    data
  })
}

export default {
  getUserList,
  login,
  register,
  list,
  delUser,
  findOne
}