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
      title1: '自助服务',
      title2: '校园卡充值',
      input1: '学号:',
      input2: '密码:'
    }
  }
}
</script>

<style scoped>

</style>
