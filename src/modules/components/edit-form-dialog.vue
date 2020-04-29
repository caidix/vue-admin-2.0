<template>
  <edit-dialog-component v-bind="$attrs" :width="width" @submit="submit" @open="open" @opened="opened" @close="close"
    :isFooterBtn="true">
    <form-component v-bind="$attrs" :configs="configs" v-loading="loading" ref="form" :data="data" :params="params">
    </form-component>
  </edit-dialog-component>
</template>

<script>
  import EditDialogComponent from 'modules/components/edit-dialog'
  import FormComponent from 'modules/components/form'
  import EditDataMixins from 'modules/mixins/edit-data'
  import {
    filterNotInConfigs
  } from '@/utils'
  export default {
    mixins: [EditDataMixins],
    components: {
      EditDialogComponent,
      FormComponent,
    },
    props: {
      configs: {
        type: Array,
        default() {
          return []
        },
      },
      width: {
        type: String,
        default: '55%',
      },

      isResetParams: {
        type: Boolean,
        default: false,
      },

      loading: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      submit(callback) {
        const params = this.$refs.form.submit()
        filterNotInConfigs(this.configs, params)
        const res = this.configs.reduce((prev, next) => {
          if (!params[next.prop] && next.required) {
            return prev + next.label + "不能为空!<br/>"
          }
          return prev
        }, '')
        if (res.length > 0) {
          this.$alert(res, "提示", {
            dangerouslyUseHTMLString: true,
            type: "warning"
          });
          return false
        }
        this.$emit('submit', {
          params,
          callback
        })
      },
      close() {
        this.$emit('close')
      },
      open() {
        this.$nextTick(() => {
          this.$emit('open')
        })
        if (this.isResetParams) {
          this.resetParams()
        }
      },
      opened() {
        this.$nextTick(() => {
          this.$emit('opened')
        })
      },
    },
  }
</script>