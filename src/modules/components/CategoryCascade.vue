<template>
  <div>
    <CascadeSelect
      ref="cascadeSelect"
      :currentIndex="currentIndex"
      :levelData="levelData"
      :maxLevel="maxLevel"
      :loadings="loadings"
      @change="handleLevelChange"
    />
  </div>
</template>
<script>
const FIRST_INDEX = -1;
import CascadeSelect from "./CascadeSelect";
export default {
  name: "CategoryCascade",
  components: {
    CascadeSelect
  },
  props: {
    data: {
      type: Object
      // required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    visibleChannel: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    this.initLevelData();
  },
  data() {
    return {
      currentIndex: FIRST_INDEX,
      maxLevel: 3,
      levelData: [],
      loadings: []
    };
  },
  methods: {
    initLevelData() {
      this.levelData = [];
      let index = 0;
      while (index++ <= this.maxLevel) {
        this.levelData.push([
          {
            value: "选项1",
            label: "黄金糕"
          },
          {
            value: "选项2",
            label: "双皮奶"
          },
          {
            value: "选项3",
            label: "蚵仔煎"
          },
          {
            value: "选项4",
            label: "龙须面"
          },
          {
            value: "选项5",
            label: "北京烤鸭"
          }
        ]);
        this.loadings.push(false);
      }
      this.$refs.cascadeSelect && this.$refs.cascadeSelect.reset();
    },
    ajaxInitData(val, level) {
      if (!val && val !== 0) return;
      if (!level || level > this.maxLevel) return;
      this.$set(this.levelData, level, []);
      this.$set(this.loadings, level, true);
      // async await => data, this.$set(this.levelData, level, data);
      this.$set(this.loadings, level, false);
    },
    updateData(val, level) {
      this.currentIndex = level;
      if (this.currentIndex !== this.maxLevel) {
        this.$refs.cascadeSelect.resetAfterValue(level);
      }
    },
    handleLevelChange(val, level) {
      this.$emit("change", val, level);
      this.updateData(val, level);
      this.$refs.cascadeSelect.setFocus(level + 1);
    }
  }
};
</script>