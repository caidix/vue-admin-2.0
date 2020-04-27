export default {
  methods: {
    mapListEnumValue(enum, val) {
      let res = "";
      if (Array.isArray(enum)) {
        enum.map((item) => {
          if (val.indexOf(item.value) > -1) {
            res += item.label + ";";
          }
        });
      }
      if (Object.isObject(enum)) {
        for (let [key, value] of Object.entries(enum)) {
          if (val.indexOf(key) > -1) {
            res += value + ";";
          }
        }
      }
      return res;
    },
  },
};
