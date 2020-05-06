<template>
  <el-table v-loading="loading" :stripe="stripe" :border="border" :data="datas" :height="height" :size="size"
    :span-method="spanMethod" :max-height="maxHeight" @sort-change="handleSortChange"
    @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" label="全选" type="selection"></el-table-column>
    <el-table-column v-if="hasExpandItem" type="expand">
      <el-form slot-scope="{ row }" label-width="80px">
        <template v-for="{ prop,props, label, isExpand, enums, component, isHtml } in configs">
          <el-form-item v-if="isExpand" :key="prop" :label="label">
            <component v-if="component" :is="component" v-model="row" :prop="prop" v-bind="$attrs" />
            <span v-else-if="isHtml" v-html="row[prop]"></span>
            <!--使用枚举格式化数组字段信息-->
            <span v-else-if="enums && Array.isArray(row[prop])">
              {{ listEnumsValue(enums, row[prop]) }}
            </span>
            <!--使用枚举显示字段信息-->
            <span v-else-if="enums">
              {{ getEnumsValue(enums, row[prop]) }}
            </span>
            <!--默认显示-->
            <span v-else>{{ row[prop] | mapArray | mapDefault }}</span>
          </el-form-item>
        </template>
      </el-form>
    </el-table-column>
    <template v-for="{
        prop,
        props,
        label,
        isExpand,
        enums,
        component,
        isHtml,
        sortable,
        isImage,
        sep,
        width,
        ...arg
      } in configs">
      <el-table-column v-bind="arg" :label="label" :sortable="sortable" :key="prop" :width="width" v-if="!isExpand">
        <template slot-scope="{ row }">
          <component v-if="component" :is="component" v-model="row" :prop="prop" v-bind="{
              ...$attrs,
              ...arg,
            }" />
          <img style="width: 100px;height:100px;" :src="row[prop]" :alt="label" v-else-if="isImage && row[prop]" />
          <span v-else-if="isHtml" v-html="row[prop]"></span>
          <!--使用枚举格式化数组字段信息-->
          <span v-else-if="enums && Array.isArray(row[prop])">
            {{ listEnumsValue(enums, row[prop], sep) | mapDefault }}
          </span>
          <!--使用枚举显示字段信息-->
          <span v-else-if="enums">
            {{ getEnumsValue(enums, row[prop]) | mapDefault }}
          </span>
          <span v-else-if="props && row[prop]">{{ row[prop][props]  | mapArray | mapDefault }}</span>
          <!--默认显示-->
          <span v-else>{{ row[prop] | mapArray | mapDefault }}</span>
        </template>
      </el-table-column>
    </template>
    <!-- 额外的列 -->
    <slot></slot>
    <template slot="empty">
      <slot name="empty"></slot>
    </template>
    <template slot="append">
      <slot name="append"></slot>
    </template>
  </el-table>
</template>

<script>
  import {
    isNil
  } from '@/utils'
  import GetEnumsValue from '@/modules/mixins/get-enum-value'
  import FilterList from '@/modules/mixins/filter-list'
  export default {
    name: 'table-list-template',
    mixins: [GetEnumsValue, FilterList],
    props: {
      configs: {
        type: Array,
        default () {
          return []
        },
      },
      datas: {
        type: Array,
        default () {
          return []
        },
      },
      stripe: {
        type: Boolean,
        default: false,
      },
      border: {
        type: Boolean,
        default: false,
      },
      height: {
        type: [Number, String],
      },
      size: {
        //medium / small / mini
        type: String,
        default: '',
      },
      selection: {
        // 添加一个el-table-column，设type属性为selection，建立多选，emit方法回调
        type: Boolean,
        default: false,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      spanMethod: {
        type: Function,
      },
      maxHeight: {
        type: Number,
      },
      expand: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      hasExpandItem() {
        const config = this.configs || []
        return this.expand || config.some((list) => list.isExpand)
      },
    },
    methods: {
      handleSortChange({
        column,
        order
      }) {
        if (isNil(column) || isNil(order)) return
        const config = this.configs.find(({
          label
        }) => label === label)
        this.$emit('sort-change', {
          prop: config.prop,
          order,
        })
      },
      handleSelectionChange(row) {
        this.$emit('selection-change', row)
      },
    },
  }
</script>