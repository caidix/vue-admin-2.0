import { Field, Fields } from '../Fields'

const id = new Field({
  prop: "id",
  label: "ID",
  width: "100",
})
const message = new Field({
  prop: "message",
  label: "信息",
  type: "input",
  required: true,
})
const content = new Field({
  prop: "content",
  label: "主要内容",
  width: "300",
  type: "textarea"
})
const isShow = new Field({
  prop: "isShow",
  label: "是否展示",
  type: "select",
  required: true,
  enums: [{
    label: '是',
    value: true
  }, {
    label: '否',
    value: false
  }]
})
const likes = new Field({
  prop: "likes",
  label: "喜欢人数",
})
const createTime = new Field({
  prop: "createTime",
  label: "创建时间",
})
const background = new Field({
  prop: "background",
  label: "背景",
  type: 'upload'
})

export const tagConfig = new Fields([
  id,
  message,
  content,
  isShow,
  likes,
  createTime
]).clone()

export const editConfig = new Fields([
  isShow,
  message,
  content,
  background,
]).clone()