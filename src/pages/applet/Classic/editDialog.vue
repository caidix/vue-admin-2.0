<template>
  <edit-component isResetParams :data="data" v-bind="$attrs" :configs="editConfig" :btnText="setTitle" @submit="submit">
    <el-input>1312312</el-input>
  </edit-component>
</template>
<script>
  import EditComponent from 'modules/components/edit-form-dialog'
  import api from "api/applet/classic";
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
        default() {
          return []
        }
      },
      datas: {
        type: Array,
        default() {
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
        this.isEdit ? this.editCategory(item) : this.createClassic(item);
      },
      async createClassic(item) {
        let {
          data
        } = await api.createClassic({
          ...item.params
        });
        if (data.code === 0) {
          Message({
            message: data.message || "添加成功",
            type: "success"
          });
          this.$emit("submit");
        } else {
          Message({
            message: data.message || "添加失败",
            type: "error"
          });
        }
        item.callback()
      },
      async editCategory(item) {
        let params = {
          ...item.params,
          id: this.editId
        };
        let {
          data
        } = await api.editCategory(params);
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