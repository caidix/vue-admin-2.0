<template>
  <div :class="{ 'template-form--inline': inline, clearfix: inline }">
    <template v-for="{
        prop,
        label,
        type,
        enums,
        props,
        required,
        component,
        pickerOptions,
        valueFormat,
        isFull,
        disabled: _disabled,
        placeholder,
        inputClass,
        rows,
        maxlength,
        border,
        min,
        max,
        step,
        formItemWidth,
        ...arg
      } in configs">
      <el-form v-if="!isLoading" :key="prop" :label-width="labelWidth" :label-position="labelPosition"
        :style="{ width: formItemWidth }" :class="{ 'template-form--inline-block': formItemWidth }"
        @submit.native.prevent>
        <el-form-item :required="required && !isQuery" :label="label">
          <slot :name="prop">
            <component :is="component" v-if="component" :ref="prop" :prop="prop" :props="props"
              :value="isFull ? params : params[prop]" :class="inputClass" :data="isFull ? params : params[prop]"
              :disabled="disabled || _disabled" :placeholder="placeholder" v-bind="{
                ...$attrs,
                ...arg,
              }" @input="handleInput(prop, $event, isFull)" @update:data="handleInput(prop, $event, isFull)" />
            <el-select v-else-if="
                (type === 'multiple-select' || type === 'select') && enums
              " v-model="params[prop]" filterable class="select" :class="inputClass"
              :multiple="type === 'multiple-select'" :collapse-tags="!arg.notCollapseTags"
              :disabled="disabled || _disabled" :placeholder="placeholder">
              <el-option v-if="isQuery" value="" label="全部" />
              <el-option v-for="{ label, value } in enums" :key="value" :value="value" :label="label" />
            </el-select>
            <el-checkbox-group v-else-if="type === 'checkbox' && enums" v-model="params[prop]" :class="inputClass"
              :disabled="disabled || _disabled">
              <el-checkbox v-for="{ label, value } in enums" :key="label" :label="label" :border="border">{{ value }}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group v-else-if="type === 'radio' && enums" v-model="params[prop]" :class="inputClass"
              :disabled="disabled || _disabled" :placeholder="placeholder">
              <el-radio v-for="{ label, value } in enums" :key="label" :label="label" :border="border">{{ value }}
              </el-radio>
            </el-radio-group>
            <el-input v-else-if="type === 'textarea'" v-model="params[prop]" v-bind="arg" type="textarea" :rows="rows"
              :maxlength="maxlength" :class="inputClass" :placeholder="placeholder || `请输入${label}`"
              :disabled="disabled || _disabled" />
            <el-date-picker v-else-if="type === 'datetimerange'" :class="inputClass" :value="params[prop]"
              type="datetimerange" :default-time="['00:00:00', '23:59:59']" :range-separator="arg.rangeSeparator || '-'"
              :start-placeholder="arg.startPlaceholder || '开始日期'" :end-placeholder="arg.endPlaceholder || '结束时间'"
              :picker-options="pickerOptions" :disabled="disabled || _disabled"
              @input="handleDateTimeRangePick(prop, props, $event)" />
            <el-date-picker v-else-if="type === 'date'" v-model="params[prop]" :class="inputClass" type="date"
              :picker-options="pickerOptions" :disabled="disabled || _disabled" :value-format="valueFormat"
              :placeholder="placeholder || '选择日期'">
            </el-date-picker>
            <el-date-picker v-else-if="type === 'datetime'" v-model="params[prop]" :class="inputClass" type="datetime"
              :picker-options="pickerOptions" :disabled="disabled || _disabled" :value-format="valueFormat"
              :placeholder="placeholder || '选择日期时间'">
            </el-date-picker>
            <el-input-number v-else-if="type === 'number'" v-model="params[prop]" v-bind="arg" :min="min" :max="max"
              :placeholder="placeholder || `请输入${label}`" :step="step || 1" controls-position="right"
              :disabled="disabled || _disabled"></el-input-number>
            <el-upload v-else-if="type === 'upload'" class="avatar-uploader"
              :action="'http://localhost:3000/api/admin/upload'" :on-success="upload">
              <img v-if="params[prop]" :src="params[prop]" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-upload v-else-if="type === 'uploadMusic'"
              :action="'http://localhost:3000/api/applet/classic/upload'" :on-success="uploadFile">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <el-input v-else v-model="params[prop]" :class="inputClass" :placeholder="placeholder || `请输入${label}`"
              :disabled="disabled || _disabled" />
          </slot>
        </el-form-item>
      </el-form>
    </template>
    <el-form :label-width="labelWidth" :label-position="labelPosition" @submit.native.prevent>
      <slot></slot>
    </el-form>
  </div>
</template>

<script>
  //isFull为复杂情况
  import SectionLoadingMixin from '@/modules/mixins/section-loading'
  import moment from 'moment'
  const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

  export default {
    name: 'form-template',
    mixins: [SectionLoadingMixin],
    inheritAttrs: false,
    props: {
      isQuery: {
        type: Boolean,
        default: false,
      },
      isFilterEmpty: {
        type: Boolean,
        default: true,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      configs: {
        type: Array,
        default() {
          return []
        },
      },
      params: {
        type: Object,
        default() {
          return {}
        },
      },
      data: {
        type: Object,
        default() {
          return {}
        },
      },
      labelWidth: {
        type: String,
        default: '120px',
      },
      labelPosition: {
        type: String,
        default: 'right',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    created() {
      // 确保数据处理正确后，再渲染组件，避免组件错误使用默认值
      this.loading()
      this.registerParams()
      this.$nextTick(() => {
        this.loaded()
      })
    },
    data() {
      return {
        currentValue: { ...this.params },
      }
    },
    methods: {
      upload(data) {
        const field = this.configs.find(field => field.type === 'upload')
        this.$set(this.params, field.prop, data.data.url)
        this.$message('上传成功！');
      },
      uploadFile(data) {
        const field = this.configs.find(field => field.type === 'uploadMusic')
        this.$set(this.params, field.prop, data.data.data)
        this.$message('上传成功！');
      },
      register(configs, params) {
        configs.forEach(({ prop }) => {
          params[prop] === undefined && this.$set(params, prop, undefined)
          this.currentValue[prop] = params[prop]
        })
      },
      registerParams() {
        this.register(this.configs, this.params)
      },
      reset(configs, params) {
        configs.forEach(({ prop, defaultValue }) => {
          const value = defaultValue
            ? defaultValue
            : this.currentValue[prop]
              ? this.currentValue[prop]
              : ''
          this.$set(
            params,
            prop,
            value === undefined ? undefined : JSON.parse(JSON.stringify(value))
          )
        })
      },
      resetParams() {
        this.reset(this.configs, this.params)
        this.$emit('reset')
        // 动态组件重置
        const refs = this.$refs || {}
        Object.values(refs)
          .filter((ref) => {
            return ref && ref[0] && typeof ref[0].reset === 'function'
          })
          .forEach((ref) => {
            ref[0] && ref[0].reset()
          })
      },
      submit() {
        this.$emit('before-submit')
        const refs = this.$refs || {}
        Object.values(refs)
          .filter((ref) => {
            return ref && ref[0] && typeof ref[0].submit === 'function'
          })
          .forEach((ref) => {
            ref[0] && ref[0].submit()
          })
        this.$emit('submit')
        return this.params
      },
      handleDateTimeRangePick(timeKey, [startTimeKey, endTimeKey], range) {
        let [startTime, endTime] = range || [undefined, undefined]
        // 将date格式转为字符串
        startTime = startTime && moment(startTime).format(DATE_FORMAT)
        endTime = endTime && moment(endTime).format(DATE_FORMAT)
        this.$set(this.params, startTimeKey, startTime)
        this.$set(this.params, endTimeKey, endTime)
        this.$set(this.params, timeKey, [startTime, endTime])
      },
      handleInput(prop, val, isFull) {
        // 多字段暂不支持自动input
        if (isFull) {
          this.$emit('change')
          return
        }
        const param = this.params[prop]
        if (Array.isArray(param)) {
          param.splice(0, param.length)
          param.splice(0, 0, ...val)
        } else {
          this.$set(this.params, prop, val)
        }
        this.$emit('change', prop, val)
      },
    },
  }
</script>

<style scoped>
  .template-form--inline>.el-form {
    float: left;
  }

  .template-form--inline-block {
    display: inline-block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>