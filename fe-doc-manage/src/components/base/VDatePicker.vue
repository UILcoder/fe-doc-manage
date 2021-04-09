<template>
  <el-date-picker
    v-bind="[$props, $attrs]"
    class="v-date-picker"
    v-on="$listeners"
  />
</template>

<script>

export default {
  name: 'VDatePicker',
  inheritAttrs: false
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.v-date-picker {
  width: 100% !important;
  /deep/ .el-input__inner {
    border: none;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px solid @inputBorder;
  }

  /deep/ .el-input__suffix {
    right: 0;
  }

  /deep/ .el-input__prefix {
    display: none;
  }
}

/deep/ input::-webkit-input-placeholder {
  color: @placeholderColor;
}
/deep/ input::-moz-input-placeholder {
  color: @placeholderColor;
}
/deep/ input::-ms-input-placeholder {
  color: @placeholderColor;
}
</style>
