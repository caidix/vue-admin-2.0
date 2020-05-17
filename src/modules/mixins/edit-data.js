export default {
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      params: {},
    };
  },
  watch: {
    data: {
      deep: true,
      handler(data) {
        this.updateParams();
      },
    },
    // params: function(data) {
    //   console.log(data);
    // },
  },
  mounted() {
    this.updateParams();
  },
  methods: {
    beforeSubmit(params) {},
    submit(callback) {
      this.beforeSubmit(this.params);
      this.$emit("submit", {
        params: this.params,
        callback,
      });
    },
    updateParams() {
      const data = JSON.parse(JSON.stringify(this.data));
      Object.keys(data).forEach((key) => {
        this.$set(
          this.params,
          key,
          data[key] === undefined || data[key] === "0000-00-00 00:00:00"
            ? this.params[key]
            : data[key]
        );
      });
    },
    resetParams() {
      const data = JSON.parse(JSON.stringify(this.data));
      this.params = data;
    },
  },
};
