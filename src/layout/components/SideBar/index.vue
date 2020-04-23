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
    >
      <sidebar-item
        v-for="route in routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import sidebarItem from "./sidebarItem";
export default {
  components: {
    sidebarItem
  },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      console.log(meta, path)
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
    },
    routes() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes;
    }
  }
};
</script>