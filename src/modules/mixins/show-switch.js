// 通用快速显示隐藏mixins
export default {
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.$nextTick(() => {
        this.isShow = true;
      })
    },
    hide() {
      this.$nextTick(() => {
        this.isShow = false;
      })
    }
  }
}