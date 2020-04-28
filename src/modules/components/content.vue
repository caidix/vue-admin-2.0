<template>
  <div class="page-panel page-content" flex="dir:top" flex-box="1">
    <div v-if="$slots.header" class="page-panel-header">
      <slot name="header"></slot>
    </div>
    <div class="page-panel-main" flex-box="1">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="page-panel-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.page-content {
  .page-panel-header {
    margin-bottom: 20px;
  }
  .page-panel-footer {
    margin-top: 20px;
  }
}
</style>
