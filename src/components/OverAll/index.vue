<template>
<div id="over_all">
  <div class="search">
    <slot name="search"></slot>
  </div>
  <div class="table">
    <slot name="table"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="less" scoped>
#over_all{
  width: 100%;
  height: calc(100vh  - 50px);
  background: @bg;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
  overflow: scroll;
  .search {
    padding: 30px;
    background: #ffffff;
  }
  .table{
    margin-top: 20px;
    background: #ffffff;
  }
}
</style>
