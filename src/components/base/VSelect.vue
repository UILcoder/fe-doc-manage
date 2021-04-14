<template>
  <el-select
    ref="input"
    v-bind="[$props, $attrs]"
    class="v-select"
    v-on="$listeners"
  >
    <slot v-if="$slots.default" />
    <el-option
      v-for="item in options"
      :key="item.key"
      :label="item.value"
      :value="item.key"
    />
  </el-select>
</template>

<script>
import { fetchCommonEnum } from '@/api/common'

export default {
  name: 'VSelect',
  inheritAttrs: false,
  props: {
    enum: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      options: []
    }
  },
  mounted() {
    const { enum: key } = this
    if (key) {
      fetchCommonEnum([key]).then((data) => {
        this.options = data.enums[key]
        if (this.defaultValue) {
          this.$emit('input', this.defaultValue)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.v-select {
  width: 100%;
  /deep/ .el-input__inner {
    border: none;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px solid @inputBorder;
  }

  /deep/ .el-input__suffix {
    right: 0;
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
