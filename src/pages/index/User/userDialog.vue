<template>
  <div>
    <el-dialog :title="isEdit?'编辑用户':'创建用户'" @closed="closed" :visible.sync="visible" width="50%">
      <el-form :model="userForm" status-icon ref="userForm" label-width="100px" class="demo-userForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.number="userForm.phone">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="userForm.type" placeholder="请选择" style="width:100%">
            <el-option label="管理员" :value="1"></el-option>
            <el-option label="普通用户" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简述" prop="introduce">
          <el-input type="textarea" v-model="userForm.introduce"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import api from "api/user.js";
  export default {
    data() {
      return {
        userForm: {
          password: "",
          username: "",
          introduce: "",
          type: 0,
          phone: ""
        },
        visible: this.show
      };
    },
    props: {
      show: Boolean,
      isEdit: Boolean,
      editForm: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      show() {
        this.visible = this.show;
      },
      isEdit(val) {
        if (val) {
          this.userForm = {
            ...this.editForm
          }
        }
      }
    },
    methods: {
      closed() {
        this.userForm = {};
        this.$emit("update:show", false);
        this.$emit("update:isEdit", false);
      },
      handleClose(done) {
        this.$emit("update:show", false);
      },
      async submit() {
        let params = {
          ...this.userForm
        };
        if (!params.username) {
          this.$message({
            type: "error",
            message: "必须填写用户名!"
          });
          return;
        }
        if (!params.password) {
          this.$message({
            type: "error",
            message: "必须填写密码!"
          });
          return;
        }
        if (params.phone) {
          params.phone = "86" + params.phone;
        }
        let {
          data
        } = this.isEdit ? await api.editUser(this.editForm._id, params) : await api.register(params);
        this.$message({
          type: data.code === 0 ? "success" : "error",
          message: data.message
        });
        data.code === 0 && this.$emit("add-success");
        this.$emit("update:show", false);
      }
    }
  };
</script>