import http from '@/utils/http.js'
const getArticle = (params) => {
  return http.request({
    method: "get",
    url: "/admin/article/list",
    params
  })
}

const delArticle = (id) => {
  return http.request({
    method: "delete",
    url: `/admin/article/delOne/${id}`
  })
}

const addArticle = (data) => {
  return http.request({
    method: "post",
    url: `/admin/article/add`,
    data
  })
}

const editArticle = (data) => {
  return http.request({
    method: "post",
    url: `/admin/article/edit`,
    data
  })
}

const findOneArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/admin/article/findOne',
    params
  })
}

const uploadImg = (data) => {
  return http.request({
    method: 'post',
    url: '/admin/article/upload',
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
  uploadImg
}