<template>
  <div :class="containerClass">
    <div :class="contentClass">
      <slot />
    </div>
    <div
      v-if="maintain"
      class="maintenance-wrapper"
    >
      维护中
    </div>
  </div>
</template>

<script>
// TODO: 维护中抽成slot，解耦通用组件
export default {
  name: 'VCard',
  props: {
    clickable: {
      type: Boolean,
      default: true
    },
    maintain: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentClass() {
      return {
        inline: this.inline,
        maintain: this.maintain
      }
    },
    containerClass() {
      return {
        'v-card': true,
        clickable: this.clickable
      }
    }
  }
}
</script>

<style lang="less" scoped>
.maintain {
  opacity: 0.3;
}

.inline {
  display: flex;
  align-items: center;
}

.v-card {
  position: relative;
  background: #fff;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
  }

  &.clickable {
    cursor: pointer;
  }

  .maintenance-wrapper {
    position: absolute;
    z-index: 299;
    background: #ff5f5f;
    padding: 2px 12px;
    color: #fff;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    border-bottom-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: 16px;
    font-weight: 400px;
  }
}

</style>
