<template>
  <edit-component isResetParams :data="data" v-bind="$attrs" :configs="editConfig" :btnText="setTitle" @submit="submit">
  </edit-component>
</template>
<script>
  import EditComponent from 'modules/components/edit-form-dialog'
  import api from "api/applet/classic";
    import {
    editConfig
  } from '@/fields/applet/classic'
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
        return editConfig.getFields()
      },
      setTitle() {
        return this.isEdit ? "编辑" : "新建分类"
      }
    },
    methods: {
      submit(item) {
        this.isEdit ? this.updateClassic(item) : this.createClassic(item);
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
      async updateClassic(item) {
        let params = {
          ...item.params,
          id: this.editId
        };
        let {
          data
        } = await api.updateClassic(params);
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