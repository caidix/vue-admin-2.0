import moment from "moment";
export default {
  filters: {
    mapDefault(val) {
      if (Date.parse(val) && Date.parse(val) > 0) {
        return moment(val).format("YYYY-MM-DD HH:mm:ss");
      } else if (typeof val === "string") {
        if (!val || val.trim() === "") return "--";
        else return val.trim();
      } else {
        return val;
      }
    },
    mapArray(val) {
      return Array.isArray(val) ? val.join(",") : val;
    },
  },
};
