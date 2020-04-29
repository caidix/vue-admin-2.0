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
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="model.desc"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" prop="img_url" label="文章封面">
        <el-upload
          class="avatar-uploader"
          :action="'http://localhost:3000/api/admin/article/upload'"
          :on-success="upload"
        >
          <img v-if="model.img" :src="model.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
    </span>
  </el-dialog>
</template>


<script>
import api from "api/blog/gather.js";
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
          img: val.img
        };
      } else {
        this.model = {
          name: "",
          desc: "",
          img: ""
        };
      }
    }
  },
  data() {
    return {
      model: { name: "", desc: "", img: "" }
    };
  },
  methods: {
    upload(data) {
      this.$set(this.model, "img", data.data.url);
    },
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
      let { data } = await api.addGather({
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
      let { data } = await api.editGather(params);
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

<style lang="scss" scoped>
  .avatar{
    width: 100%;
  }
</style>