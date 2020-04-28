import SectionLoadingMixin from './section-loading'
const LIMIT = 10
const DEFAULT_TOTAL = 1
export default {
  mixins: [SectionLoadingMixin],
  data() {
    return {
      page: 1,
      datas: [],
      limit: LIMIT,
      total: DEFAULT_TOTAL,
    }
  },
  methods: {
    async fetchData() {
      this.loading()
      let { data } = await this.getDatas()
      if (
        data &&
        data.code === 0 &&
        data.data &&
        Array.isArray(data.data.data)
      ) {
        this.datas = data.data.data
        this.total = data.data.total ? data.data.total : data.data.data.length
      }
      this.loaded()
    },
    getDatas() {
      return Promise.resolve([])
    },
    resetData() {
      this.datas = []
      this.resetPage()
      this.fetchData()
    },
    resetPage() {
      this.limit = LIMIT
      this.total = DEFAULT_TOTAL
    },
  },
}
