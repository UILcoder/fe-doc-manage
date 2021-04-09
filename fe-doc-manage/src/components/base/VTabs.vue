<template>
  <el-tabs
    v-bind="[$props, $attrs]"
    :class="classObj"
  >
    <slot />
  </el-tabs>
</template>

<script>
export default {
  name: 'VTabs',
  inheritAttrs: false,
  props: {
    autoFocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    classObj() {
      return {
        'v-input': true,
        focus: this.focus
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
/deep/ .el-tabs__nav-wrap {
  &:after {
    background-color: transparent
  }
  .el-tabs__active-bar {
    height: 4px;
  }
  .el-tabs__item {
    font-size: 16px;
    color: #333;
    font-weight: normal;
    letter-spacing: 1px;
    &.is-active {
      font-weight: bold;
    }
  }
}

</style>
