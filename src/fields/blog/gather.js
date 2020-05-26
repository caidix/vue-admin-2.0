import { Field, Fields } from "../Fields";

const name = new Field({
  prop: "name",
  label: "归档名称",
  width: "120",
});
const desc = new Field({
  prop: "desc",
  label: "归档描述",
  width: "300",
});
const update_time = new Field({
  prop: "updatedAt",
  label: "修改日期",
});
const create_time = new Field({
  prop: "createdAt",
  label: "创建日期",
});
const img = new Field({
  prop: "img",
  label:'背景图片',
  isImage: true,
});

export const config = new Fields([
  name,
  desc,
  update_time,
  create_time,
  img,
]).clone();
