export default {
  filters: {
    mapDefault(val) {
      if (typeof val === 'string') {
        if (!val || val.trim() === '') return '--'
        else return val.trim()
      } else {
        return val
      }
    },
    mapArray(val) {
      return Array.isArray(val)?val.join(','): val;
    }
  }
}