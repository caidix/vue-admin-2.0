<template>
  <el-button :title="btnTitle" :class="btnClass" :icon="btnIcon" :size="btnSize" :type="btnType"
    @click.stop.prevent="open">
    {{btnText}}
    <el-dialog ref="dialog" v-bind="$attrs" :width="width" :visible.sync="isShow" :append-to-body="true"
      :lock-scroll="true" :title="title" @open="opened" @close="close">
      <template slot="title">
        <slot name="title"></slot>
      </template>
      <slot></slot>
      <span v-if="isFooterBtn" slot="footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button :disabled="!isValid" type="primary" @click="submit">
          {{submitText}}
        </el-button>
      </span>
    </el-dialog>
  </el-button>
</template>

<script>
  import ShowSwitchMixins from '@/modules/mixins/show-switch'
  export default {
    name: 'edit-dialog-template',
    mixins: [ShowSwitchMixins],
    props: {
      title: {
        type: String,
        default: ''
      },
      btnTitle: {
        type: String,
        default: ''
      },
      btnType: {
        // primary / success / warning / danger / info / text
        type: String,
        default: 'primary'
      },
      btnSize: {
        //medium / small / mini
        type: String,
        default: 'small'
      },
      btnClass: {
        type: String
      },
      btnText: {
        type: [String, Number],
        default: ''
      },
      btnIcon: {
        type: String
      },
      btnDisabled: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '800px'
      },
      submitText: {
        type: String,
        default: '确定'
      },
      isFooterBtn: {
        type: Boolean,
        default: false
      },
      isValid: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      open() {
        this.show()
        this.$emit('open');
      },
      close() {
        this.$emit('close')
      },
      submit() {
        this.$emit('submit', this.closeDialog)
      },
      closeDialog() {
        this.$refs.dialog.handleClose();
        this.close()
      },
      opened() {
        this.$nextTick(() => {
          this.$emit('opened')
        })
      }
    },
  }
</script>