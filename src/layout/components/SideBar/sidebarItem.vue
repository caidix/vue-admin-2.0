<template>
  <div>
    <transition name="fade">
      <template
        v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
      >
        <router-link tag="li" :to="resolvePath(onlyOneChild.path)">
          <el-menu-item :index="resolvePath(onlyOneChild.path)">
            <i v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"></i>
            {{onlyOneChild.meta.title}}
          </el-menu-item>
        </router-link>
      </template>
      <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
        <template slot="title">
          <i v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"></i>
          {{item.meta.title}}
        </template>
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        />
      </el-submenu>
    </transition>
  </div>
</template>

<script>
import path from "path";
export default {
  name: "SidebarItem",
  data() {
    this.onlyOneChild = null;
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath;
      }
      if (/^(https?:|mailto:|tel:)/.test(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    }
  }
};
</script>