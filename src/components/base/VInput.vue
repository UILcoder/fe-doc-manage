<template>
  <el-input
    ref="input"
    v-bind="[$props, $attrs]"
    :class="classObj"
    v-on="inputListeners"
  >
    <template
      v-if="$slots.prepend"
      slot="prepend"
    >
      <slot name="prepend" />
    </template>
    <template
      v-if="$slots.append"
      slot="append"
    >
      <slot name="append" />
    </template>
    <template
      v-if="$slots.prefix"
      slot="prefix"
    >
      <slot name="prefix" />
    </template>
    <template
      v-if="$slots.suffix"
      slot="suffix"
    >
      <slot name="suffix" />
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'VInput',
  inheritAttrs: false,
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
    },
    inputListeners() {
      const vm = this
      return Object.assign({},
        this.$listeners,
        {
          focus() {
            vm.$emit('focus')
            if (vm.$attrs.type === 'textarea') {
              return
            }
            vm.focus = true
          },
          blur() {
            vm.focus = false
            vm.$emit('blur')
          }
        })
    }
  },
  mounted() {
    if (this.$attrs.autofocus) {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.v-input {
  &:before {
    content: "";
    position: absolute;
    width: 0%;
    height: 1px;
    z-index: 1;
    background: #2d81f7;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
  }
  &.focus {
    &:before {
      width: 100%;
    }
  }

  /deep/ .el-input__inner {
    border: none;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px solid @inputBorder;
    &:hover {
      border-bottom-color: @inputBorderHover;
    }
  }
  /deep/ .el-input__prefix {
    display: flex;
    justify-content: center;
  }
  /deep/ .el-input__suffix {
    display: flex;
  }
  /deep/ .el-input__suffix-inner {
    display: flex;
    justify-content: center;
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
