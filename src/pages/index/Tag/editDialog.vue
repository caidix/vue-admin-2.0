<template>
  <edit-component isResetParams :data="data" v-bind="$attrs" :configs="editConfig" :btnText="setTitle" @submit="submit">
  </edit-component>
</template>
<script>
  import EditComponent from 'modules/components/edit-form-dialog'
  import api from "api/blog/tag";
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
        return this.isEdit ? "编辑" : "新建标签"
      }
    },
    methods: {
      submit(item) {
        this.isEdit ? this.editTag(item) : this.addTag(item);
      },
      async addTag(item) {
        let {
          data
        } = await api.addTag({
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
      async editTag(item) {
        let params = {
          ...item.params,
          id: this.editId
        };
        let {
          data
        } = await api.editTag(params);
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