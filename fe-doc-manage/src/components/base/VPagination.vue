<template>
  <el-pagination
    v-bind="[$props, $attrs]"
    class="pagination"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'VPagination'
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  color: #999;

  /deep/ .el-pager {
    li {
      font-size: 14px;
      font-weight: normal;
      &.active {
        color: #4490f1;
        font-weight: bold;
      }
    }
  }
}
</style>
