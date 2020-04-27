<template>
  <el-dialog
    :title="item.id?'编辑分类':'新建分类'"
    :visible.sync="dialogVisibie"
    width="40%"
    :before-close="handleClose"
    center
    :destroy-on-close="true"
  >
    <el-form label-width="100px" @submit.native.prevent="save">
      <el-form-item label="上级分类:">
        <el-select v-model="model.parent">
          <el-option
            v-for="value in parents"
            :key="value._id"
            :label="value.name"
            :value="value._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </span>
  </el-dialog>
</template>


<script>
import api from "@/api/tag.js";
import { Message } from "element-ui";
export default {
  props: {
    dialogVisibie: {
      type: Boolean,
      default: false,
      required: true
    },
    item: Object,
    parents: {
      type: Array,
      default: [],
      required: true
    }
  },
  watch: {
    item: function(val) {
      if (val.id) {
        this.model = {
          name: val.name,
          desc: val.desc,
          parent: val.parent._id
        };
      } else {
        this.model = {
          name: "",
          desc: "",
          parent: ""
        };
      }
    }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialog-close");
    },
    save() {
      if (this.model.name === "") {
        Message({
          message: "名字不能为空！",
          type: "error"
        });
        return;
      }
      this.item.id ? this.editTag() : this.addTag();
    },
    async addTag() {
      
      let { data } = await api.addTag({
        ...this.model
      });
      if (data.code === 0) {
        Message({
          message: data.message || "添加成功",
          type: "success"
        });
        this.handleClose();
        this.$emit("change-success");
      } else {
        Message({
          message: data.message || "添加失败",
          type: "error"
        });
      }
    },
    async editTag() {
      let params = {
        ...this.model,
        id: this.item.id
      };
      let { data } = await api.editTag(params);
      if (data.code === 0) {
        Message({
          message: data.message || "修改成功",
          type: "success"
        });
        this.handleClose();
        this.$emit("change-success");
      } else {
        Message({
          message: data.message || "修改失败",
          type: "error"
        });
      }
    }
  }
};
</script>