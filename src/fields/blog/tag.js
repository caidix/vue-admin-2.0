export const tagConfig = [
  {
    prop: "id",
    label: "ID",
    width: "100",
  },
  {
    prop: "name",
    label: "分类名称",
    width: "120",
  },
  {
    prop: "desc",
    label: "分类描述",
    width: "300",
  },
  {
    prop: "parent",
    label: "上级分类",
  },
  {
    prop: "update_time",
    label: "修改日期",
  },
];

export const editConfig = [
  {
    prop: "parent",
    label: "上级分类",
    type: "select",
  },
  {
    prop: "name",
    label: "标签名称",
    type: "input",
    required: true,
  },
  {
    prop: "desc",
    label: "分类描述",
    type: "input"
  },
];
