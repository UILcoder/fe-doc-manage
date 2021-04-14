<template>
  <span
    :class="classObj"
    @click="handleClick"
  >
    <i
      v-if="loading"
      class="el-icon-loading"
    />
    <v-icon
      v-if="icon && !loading"
      :name="icon"
    />
    <slot />
  </span>
</template>

<script>
export default {
  name: 'VLink',
  props: {
    href: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj() {
      return {
        'v-link': true,
        highlight: this.selected && this.clickable,
        clickable: this.clickable,
        selected: this.selected,
        dark: this.dark
      }
    }
  },
  methods: {
    handleClick() {
      if (!this.clickable || this.loading) {
        return
      }

      if (this.href && this.href !== this.$route.path) {
        return this.$router.push(this.href)
      }
      // 向外传递click事件
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assests/styles/common.less";

.v-link {
  color: #666;
  transition: all 0.2s ease;
  user-select: none;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  &.dark {
    color: #333;
  }
  .iconfont {
    margin-right: 3px;
  }
  &:hover {
    color: @mainColor;
  }
  &.selected {
    color: @mainColor;
  }
  &.clickable {
    cursor: pointer;
  }
  &.highlight {
    &:hover {
      color: #70adff;
    }
  }
  /deep/ .el-icon-loading {
    font-size: 20px;
  }
}
</style>
