export default {
  methods: {
    listEnumsValue(enums = [], data = [], sep = ";") {
      return enums
        .filter(({ value }) => {
          data.includes(value);
        })
        .map((item) => item.label)
        .join(sep);
    },
    getEnumsValue(enums = [], val) {
      const item = enums.find(({ value }) => value === val);
      return item && item.label;
    },
  },
};
