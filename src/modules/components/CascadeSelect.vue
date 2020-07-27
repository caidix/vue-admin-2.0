<template>
  <div flex="dir:left cross:center">
    <template v-for="(item, index) in levelData">
      <el-select
        :ref="'levelDom' + index + (name || '')"
        v-model="levels[index]"
        filterable
        :key="index"
        :loading="loadings[index]"
        placeholder="请选择"
        :disabled="disabled||disable[index]"
        @change="handleSelectChange(...arguments, index)"
      >
        <el-option
          v-for="(_item, _index) in levelData[index]"
          :key="_index"
          :label="_item.label"
          :value="_item.value"
        ></el-option>
      </el-select>
    </template>
  </div>
</template>
<script>
export default {
  name: "CategoryCascade",
  props: {
    currentIndex: Number,
    maxLevel: Number,
    levelData: {
      type: Array,
      default() {
        return [];
      }
    },
    loadings: {
      type: Array,
      default() {
        return [];
      }
    },
    name: String,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      levels: []
    };
  },
  created() {
    this.reset();
  },
  computed: {
    disable() {
      return this.levelData.map((data, index) => index > this.currentIndex + 1);
    }
  },
  methods: {
    reset() {
      this.levelData.forEach((data, index) => {
        this.$set(this.levels, index, "");
      });
    },
    // 自动弹出下拉框
    setFocus(level) {
      if (!this.$refs["levelDom" + level + (this.name || "")]) return;
      this.$refs[
        "levelDom" + level + (this.name || "")
      ][0].menuVisibleOnFocus = false;
      this.$nextTick(() => {
        this.$refs["levelDom" + level + (this.name || "")][0].toggleMenu();
      });
    },
    handleSelectChange(val, level) {
      this.$emit("change", val, level);
    },
    resetAfterValue(level) {
      if (this.maxLevel <= level) return;
      this.levels = this.levels.map((data, index) => {
        if (index > level) return "";
        return data;
      });
    }
  }
};
</script>
<style scoped>
.el-select.collapse-tags + .el-select {
  margin-left: 4px;
}
.toolbar-input {
  width: auto;
  max-width: 199px;
}
</style>