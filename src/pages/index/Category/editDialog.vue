<template>
  <edit-component isResetParams :data="data" v-bind="$attrs" :configs="editConfig" :btnText="setTitle" @submit="submit">
  </edit-component>
</template>
<script>
  import EditComponent from 'modules/components/edit-form-dialog'
  import api from "api/blog/category";
  import {
    Message
  } from "element-ui";
  export default {
    components: {
      EditComponent
    },
    props: {
      data: {
        type: Object
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      editId: {
        type: [Number, String]
      },
      configs: {
        type: Array,
        default () {
          return []
        }
      },
      datas: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      defaultValue() {
        return true
      },
      setData() {
        return false
      },
      editConfig() {
        return this.configs;
      },
      setTitle() {
        return this.isEdit ? "编辑" : "新建分类"
      }
    },
    methods: {
      submit(item) {
        this.isEdit ? this.editCategories(item) : this.addCategories(item);
      },
      async addCategories(item) {
        let {
          data
        } = await api.addCategories({
          ...item.params
        });
        if (data.code === 0) {
          Message({
            message: data.message || "添加成功",
            type: "success"
          });
          this.$emit("submit");
          item.callback()
        } else {
          Message({
            message: data.message || "添加失败",
            type: "error"
          });
        }
      },
      async editCategories(item) {
        let {
          data
        } = await api.editCategories(this.editId, {
          ...item.params
        });
        if (data.code === 0) {
          Message({
            message: data.message || "修改成功",
            type: "success"
          });
          this.$emit("submit");
        } else {
          Message({
            message: data.message || "修改失败",
            type: "error"
          });
        }
        item.callback()
      }

    }
  }
</script>