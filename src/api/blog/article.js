import http from '@/utils/http.js'
const getArticle = (params) => {
  return http.request({
    method: "get",
    url: "/admin/articles",
    params
  })
}

const delArticle = (id) => {
  return http.request({
    method: "delete",
    url: `/admin/articles/${id}`
  })
}

const addArticle = (data) => {
  return http.request({
    method: "post",
    url: `/admin/articles`,
    data
  })
}

const editArticle = (id, data, config = {}) => {
  return http.request({
    url: `/admin/articles/${id}`,
    method: "put",
    data,
    config
  });
}

const findOneArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/admin/articles/find',
    params
  })
}

const fuzzySearch = (params) => {
  return http.request({
    method: 'get',
    url: '/admin/articles/fuzzySearch',
    params,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

const uploadImg = (data) => {
  return http.request({
    method: 'post',
    url: '/admin/upload',
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export default {
  getArticle,
  delArticle,
  editArticle,
  findOneArticle,
  addArticle,
  uploadImg,
  fuzzySearch
}