<template>
  <div class="cd-site__pane">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SideBar from "./components/SideBar";
export default {
  name: "Layout",
  components: {
    SideBar
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.cd-site__pane {
  @include clearfix;
  width: 100%;
  height: 100%;
  position: relative;
  .sidebar-container {
    transition: width .28s;
    width: 210px!important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }
  .main-container {
    margin-left: 220px;
    background: #f6f8f9;
    min-height: 100%;
    transition: margin-left 0.28s;
    position: relative;
  }
}
</style>