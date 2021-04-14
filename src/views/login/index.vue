<template>
  <div>
    <h1><i>欢迎您！使用安徽科技学院宿舍管理系统</i></h1>
    <div class="contain" v-if="showLogin">
      <el-form :inline='true' :model="formInline">
        <el-form-item label="账号:">
          <el-input v-model="username" placeholder="请输入账号" required></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="password" placeholder="请输入密码" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="handle('login')">登录</el-button>
          <el-button plain @click="handle('regit')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <regit v-show='showRegit' />
  </div>

</template>

<script>
import regit from './regit.vue';

export default {
  data() {
    return {
      showRegit: false,
      showLogin: true
    }
  },
  components: {
    regit
  },
  methods: {
    /**
     * 查询用户信息
     */
    getInfo() {
      this.$peopleInfoService.getInfo()
    },
    /**
     * 登陆和注册按钮
     */
    handle(item) {
      if (item === 'login') {
        this.$router.push('/user/user')
      } else {
        this.showRegit = true
        this.showLogin = false
      }
    }
  },

}
</script>

<style lang='less' scope>
body {
  background-color: rgba(87, 152, 212, 0.979);
  h1 {
    margin-left: 100px;
    margin-top: 300px;
    float: left;
    font-size: 50px;
    color: #0e4ed8;
  }
  .contain {
    width: 550px;
    height: 450px;
    float: right;
    background: rgba(203, 211, 221, 0.719);
    margin-right: 200px;
    margin-top: 200px;
    .el-form {
      .el-form-item {
        margin: 55px 141px;
        .el-form-item__label {
          font-size: 30px;
        }
        .el-button {
          padding: 12px 42px;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
