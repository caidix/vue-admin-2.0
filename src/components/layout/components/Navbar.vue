<template>
  <div>
    <div class="navbar project-pane">
      <ul>
        <li @click="handleChangeUrl('index')">博客</li>
        <li @click="handleChangeUrl('applet')">小程序</li>
      </ul>

      <div class="right-menu">
        <ScreenFull class="screen-full" />
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <div class="user">{{username || '未登入'}}</div>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <template v-if="username">
              <router-link to="/">
                <el-dropdown-item>主页</el-dropdown-item>
              </router-link>
              <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
                <el-dropdown-item>Github</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click.native="logout">
                <span style="display:block;">登出</span>
              </el-dropdown-item>
            </template>
            <el-dropdown-item @click.native="login">
              <span style="display:block;">登陆</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="navbar">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />

      <breadcrumb class="breadcrumb-container" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ScreenFull from "@/components/Hamburger/screenFull";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ScreenFull
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "username"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm(`确定登出?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("user/loginOut");
        this.$router.push("/login");
      });
    },
    handleChangeUrl(url) {
      if (process.env.NODE_ENV === "development") {
        window.location.href = `${url}`;
      } else {
        window.location.href = `${url}.html`;
      }
    }
  },
  login() {
    this.$router.push("/login");
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  &.project-pane {
    background: #ffb3a7;
    ul {
      display: inline-block;
      li {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        margin: 0 10px;
        padding: 0 10px;
        text-decoration: none;
        display: inline-block;
        transition: color 0.3s;
        &:hover {
          background-image: linear-gradient(90deg, red, blue);
          background-clip: text;
          color: transparent;
        }
      }
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .screen-full {
      height: 100%;
      vertical-align: center;
      cursor: pointer;
      margin-right: 10px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: center;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
