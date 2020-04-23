<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="false"
      active-text-color="#409EFF"
      mode="vertical"
      style="height:100%"
    ></el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  mounted(){
    console.log(this.$route.$options)
  },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.active) {
        return meta.active;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>