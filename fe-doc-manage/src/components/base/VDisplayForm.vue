<template>
  <div>
    <div
      v-for="item in labelList"
      :key="item.key"
    >
      <div
        v-if="!hideIfNoData || item.forceShow || (hideIfNoData && data[item.key])"
        class="form-item"
        :class="item.required ? 'el-form-item is-required' : ''"
      >
        <div
          class="label el-form-item__label"
          :style="`width:${item.labelWidth || labelWidth}px;text-align: ${textAlign}`"
        >
          {{ item.label }}：
        </div>
        <div
          class="content"
          :style="`${item.width ? 'width:' + item.width + 'px' : ''}`"
        >
          <slot
            v-if="item.custom"
            :name="item.key"
          />
          <span v-if="!item.custom">{{ data[item.key] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VDisplayForm',
  props: {
    labelWidth: {
      type: Number,
      default: 110
    },
    hideIfNoData: {
      type: Boolean,
      default: false
    },
    labelList: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      default: () => ({})
    },
    textAlign: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style lang="less" scoped>
.mt20 {
  margin-top: 20px;
}

.form-item {
  display: flex;
  align-items: center;
  .label {
    color: #999;
    letter-spacing: 1px;
  }

  .content {
    color: #333;
    display: block;
    width: 650px;
    letter-spacing: 1px;
  }
}
</style>
