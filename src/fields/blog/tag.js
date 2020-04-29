import { Field, Fields } from '../Fields'

const id = new Field({
  prop: "id",
  label: "ID",
  width: "100",
})
const name = new Field({
  prop: "name",
  label: "标签名称",
  width: "120",
  type: "input",
  required: true,
})
const desc = new Field({
  prop: "desc",
  label: "标签描述",
  width: "300",
  type: "input"
})
const parent = new Field({
  prop: "parent",
  label: "上级标签",
  type: "select",
})
const update_time = new Field({
  prop: "update_time",
  label: "修改日期",
})

export const tagConfig = new Fields([
  id,
  name,
  desc,
  parent,
  update_time
]).clone()

export const editConfig = new Fields([
  parent,
  name,
  desc,
]).clone()