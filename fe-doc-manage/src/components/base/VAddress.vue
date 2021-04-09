<template>
  <el-cascader
    v-model="value"
    class="v-address"
    placeholder="请选择省、市、区"
    :props="props"
    :options="options"
  />
</template>

<script>
import { getProvinces, getCities, getCounties } from '@/api/common'

export default {
  name: 'VAddress',
  props: {
    address: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      value: [],
      options: [],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level, value } = node
          if (level === 0) {
            getProvinces().then((data) => {
              const nodes = data.map(item => ({
                value: item.code,
                label: item.name,
                leaf: level >= 2
              }))
              resolve(nodes)
            })
          } else if (level === 1) {
            getCities(value).then((data) => {
              const nodes = data.map(item => ({
                value: item.code,
                label: item.name,
                leaf: level >= 2
              }))
              resolve(nodes)
            })
          } else if (level === 2) {
            getCounties(value).then((data) => {
              const nodes = data.map(item => ({
                value: item.code,
                label: item.name,
                leaf: level >= 2
              }))
              resolve(nodes)
            })
          }
        }
      }
    }
  },
  watch: {
    value(val) {
      this.$emit('update:address', val)
    },
    address(newVal, oldValue) {
      if (newVal.toString() !== oldValue.toString()) {
        this.initOptions(newVal)
      }
    }
  },
  methods: {
    initOptions(val) {
      const value = val
      getProvinces().then(data => {
        const options = data.map(item => ({
          value: item.code,
          label: item.name,
          leaf: false
        }))
        const selectedPro = options.find(item => `${item.value}` === `${value[0]}`)
        getCities(value[0]).then(data => {
          selectedPro.children = data.map(item => ({
            value: item.code,
            label: item.name,
            leaf: false
          }))
        }).then(_ => {
          const selectedCity = selectedPro.children.find(item => `${item.value}` === `${value[1]}`)
          getCounties(value[1]).then(data => {
            selectedCity.children = data.map(item => ({
              value: item.code,
              label: item.name,
              leaf: true
            }))
            this.value = [...value]
            this.options = options
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.v-address {
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
</style>
