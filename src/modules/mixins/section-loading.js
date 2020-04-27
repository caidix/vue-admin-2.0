// 配合element-ui的v-loading指令进行局部加载 需要添加v-loading="isLoading"
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    beforeLoading() { },
    afterLoading() { },
    loading() {
      this.beforeLoading();
      this.isLoading = true;
    },
    loaded() {
      this.afterLoading();
      this.isLoading = false;
    }
  }
}