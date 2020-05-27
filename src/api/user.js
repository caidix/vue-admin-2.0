import http from '@/utils/http.js'

const editUser = (id, data, config = {}) => {
  return http.request({
    url: `/users/${id}`,
    method: "put",
    data,
    config
  });
};

const login = (data) => {
  return http.request({
    method: 'POST',
    url: '/auth/login',
    data
  })
}

const list = (params = {}) => {
  return http.request({
    method: 'get',
    url: '/users',
    params
  })
}

const register = (data) => {
  return http.request({
    method: 'post',
    url: '/users/register',
    data
  })
}


const delUser = (id, config = {}) => {
  return http.request({
    url: `/users/${id}`,
    method: "delete",
    config
  });
};

const findOne = (data) => {
  return http.request({
    method: 'get',
    url: '/auth/user',
    data
  })
}

export default {
  editUser,
  login,
  register,
  list,
  delUser,
  findOne
}