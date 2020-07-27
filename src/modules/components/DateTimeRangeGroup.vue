<template>
  <div class="date-time__group">
    <el-date-picker
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      default-time="00:00:00"
      :value="startValue"
      :picker-options="startPickerOption"
      @input="handleStartInput"
    ></el-date-picker>
    <p class="line">-</p>
    <el-date-picker
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      default-time="23:59:59"
      :value="endValue"
      :picker-options="endPickerOption"
      @input="handleEndInput"
    ></el-date-picker>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "DateTimeRangeGroup",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    startValue() {
      return this.value[0];
    },
    endValue() {
      return this.value[1];
    },
    startPickerOption() {
      const value = this.endValue;
      return {
        disabledDate(timer) {
          return (
            value &&
            moment(timer)
              .startOf("day") // 时间的开始 00-00
              .isAfter(moment(value))
          );
        }
      };
    },
    endPickerOption() {
      const value = this.startValue;
      return {
        disabledDate(timer) {
          return (
            value &&
            moment(timer)
              .endOf("day") // 时间的末尾 23-59
              .isBefore(moment(value)) //在此之前
          );
        }
      };
    }
  },
  methods: {
    handleStartInput(val) {
      if (this.endValue && moment(val).isAfter(moment(this.endValue))) {
        return;
      }
      if (val) {
        this.$emit("input", [val, this.endValue]);
      } else {
        this.$emit("input", null);
      }
    },
    handleEndInput(val) {
      if (this.startValue && moment(this.startValue).isAfter(moment(val))) {
        return;
      }
      if (val) {
        this.$emit("input", [this.startValue, val]);
      } else {
        this.$emit("input", null);
      }
    }
  }
};
</script>
<style scoped>
.date-time__group {
  display: flex;
  align-items: center;
}
.line {
  margin: 0 15px;
  text-align: center;
}
</style>