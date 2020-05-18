import { Field, Fields } from '../Fields'

const name = new Field({
  prop: "name",
  label: "分类名称",
  width: "120",
  type: "input",
  required: true,
})
const desc = new Field({
  prop: "desc",
  label: "分类描述",
  width: "300",
  type: "input"
})
const update_time = new Field({
  prop: "updatedAt",
  label: "修改日期",
})
const create_time = new Field({
  prop: "createdAt",
  label: "创建日期",
})

export const tagConfig = new Fields([
  name,
  desc,
  update_time,
  create_time
]).clone()

export const editConfig = new Fields([
  name,
  desc,
]).clone()