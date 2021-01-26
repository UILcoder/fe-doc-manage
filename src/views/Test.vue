<template>
  <div class="test">
    <!-- v-preventReClick = "5000" -->
    <el-button type="primary" @click="send" v-preventReClick="3000">发送请求配合vuex和session使用</el-button><br/>
    <span v-if="userInfo">用户ID:{{userInfo.user.userId}}</span><br/>

    <div>$nextTick:</div>
    <div ref="msg">{{msg}}</div>
    <div v-if="msg1">msg1 $nextTick: {{msg1}}</div>
    <div v-if="msg2">msg2 $nextTick: {{msg2}}</div>
    <div v-if="msg3">msg3 $nextTick: {{msg3}}</div>
    <el-button type="primary" @click="changeMsg">点击</el-button>
    <editor-bar
      v-model="detail"
      :clearTag="clearTag"
      :upType="upTypeStr"
      @change="change"
    ></editor-bar><br/>
    <img v-defaultImg src="xxx"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditorBar from 'components/wangEditor/EditorBar.vue';

// import { Session } from '../utils/storage';

export default {
  name: 'Test',
  components: {
    EditorBar
  },
  data() {
    return {
      msg: 'zhangsan',
      msg1: '',
      msg2: '',
      msg3: '',
      clearTag: false,
      detail: '',
      upTypeStr: '100122',
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {
  },
  methods: {
    send() {
      const param = {
        code: 'ceJ2jZmLoJ9D0eCy_kwH2uJi7zV2IW5fgrCpeqsTuO8'
      }
      // const _that = this
      // this.$userService.getUserInfo(param).then(function () {
      //   console.log(_that)
      // })

      this.$userService.getUserInfo(param).then(() => {
        console.log(this)
      })

      // const that = this
      // this.$userService.getUserInfo(param).then(() => {
      //   console.log(that)
      // })
    },
    changeMsg() {
      this.msg = 'lisi' // 这种是双向绑定
      this.msg1 = this.$refs.msg.innerHTML // this.$refs.msg.innerHTML的值依旧是zhangsan
      this.$nextTick(() => { // 下一次DOM更新完成之后更新
        this.msg2 = this.$refs.msg.innerHTML // this.$refs.msg.innerHTML的值为lisi
      })
      this.msg3 = this.$refs.msg.innerHTML // this.$refs.msg.innerHTML的值依旧是zhangsan
    },

    change(val, length) {
      console.log(JSON.stringify(val) + JSON.stringify(length))
    },

  }
};
</script>

<style lang="less">
  .test {
    margin-top: 100px;
  }
</style>
