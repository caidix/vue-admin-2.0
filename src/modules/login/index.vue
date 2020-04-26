<template>
  <div id="login">
    <div class="login-box">
      <el-form
        ref="loginForm"
        :label-position="labelPosition"
        :model="formLabelAlign"
        autocomplete="on"
        :rules="loginRules"
      >
        <div class="title-container">
          <h3 class="title">后台登陆</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <i class="el-icon-user-solid"></i>
          </span>
          <el-input
            ref="username"
            v-model="formLabelAlign.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-unlock"></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="formLabelAlign.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i class="el-icon-more"></i>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleLogin" class="form-button">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" class="form-button" plain @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  watch: {
    $route: {
      handler: function(val) {
        let { query } = val;
        if (query) {
          this.beforePath = query.redirect ? query.redirect : "/index";
        }
      },
      immediate: true
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error("请输入正确的用户名!"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("至少输入6位以上的密码!"));
      } else {
        callback();
      }
    };
    return {
      beforePath: "",
      labelPosition: "left",
      passwordType: "password",
      formLabelAlign: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    async handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let result = await this.$store.dispatch("user/login", {
            ...this.formLabelAlign
          });
          if (result.code === 0) {
            this.$router.push({ path: this.beforePath });
          } else {
            this.$message({
              type: "error",
              message: result.message
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkCapslock() {},
    handleReset() {
      this.formLabelAlign = {
        username: "",
        password: ""
      };
    }
  }
};
</script>
<style lang="scss">
$bg: #2d3a4b;
$cursor: #fff;
$light_gray: #eee;
#login {
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 47px;
    caret-color: $cursor;

    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }
}
</style>
<style lang="scss" scoped>
$bg: #50616d;
$cursor: #fff;
$light_gray: #eee;
#login {
  height: 100%;
  display: flex;
  justify-content: center;
  background: url("https://cd-blog.oss-cn-shenzhen.aliyuncs.com/admin/blue.png");
  background-size: 100% 100%;
  margin: 0px auto;
  background-repeat: no-repeat;
  background-position: 0px 0px, 0px -40px;
  align-items: center;
}
.login-box {
  display: flex;
  width: 400px;
  background: #177cb0;
  padding: 20px;
  border-radius: 10%;
  .el-form {
    width: 100%;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .form-button {
    width: 100%;
  }
  .svg-container {
    display: inline-block;
    margin-left: 10px;
  }
  .show-pwd {
    cursor: pointer;
  }
}
</style>