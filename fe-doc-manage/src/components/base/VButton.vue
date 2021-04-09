<template>
  <div
    :class="classObj"
    @click="handleClick"
  >
    <i
      v-if="loading"
      class="el-icon-loading"
    />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VButton',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj() {
      return {
        'v-button': true,
        white: this.type === 'white',
        'is-loading': this.loading,
        disable: this.disable
      }
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';

.v-button {
  .col-center-middle();
  background-color: @mainColor;
  box-shadow: 0px 10px 20px -10px rgba(73,144,241,0.5);
  border-radius: 4px;
  height: 44px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  user-select: none;
  cursor: pointer;
  &.white {
    background-color: #fff;
    color: @mainColor;
    box-shadow:0px 10px 20px -10px rgba(73,144,241,0.2);
    border:1px solid rgba(73,144,241,1);
    &:hover {
      background-color: #fff;
    }
  }

  &.disable {
    background-color: #eee;
    border: 0;
    box-shadow: initial;
    cursor: auto;
    &:hover {
      background-color: #eee;
    }
  }

  .el-icon-loading {
    margin-right: 5px;
    font-size: 20px;
  }

  &:hover {
    background-color: #2d81f7
  }

  &.is-loading {
    pointer-events: none;
    opacity: 0.8;
  }
}
</style>
