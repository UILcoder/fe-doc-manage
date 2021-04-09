<template>
  <div>
    <format :title1="title1" :title2="title2" :input1="input1" :input2="input2">
    </format>
  </div>
</template>

<script>
import format from '@/views/lifeSerive/format.vue';

export default {
  name: 'index',
  components: {
    format
  },
  data() {
    return {
      title1: '电费查询',
      title2: '电费充值',
      input1: '楼宇号:',
      input2: '宿舍号:'
    }
  }
}
</script>

<style scoped>

</style>
