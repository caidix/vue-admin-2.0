import TableMixin from './table';
export default {
  mixins: [TableMixin],
  methods: {
    handlePageChange(val) {
      this.page = val;
      this.fetchData();
    },
    handleLimitChange(val) {
      this.limit = val;
      this.fetchData();
    }
  },
}