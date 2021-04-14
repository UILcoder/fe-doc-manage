<template>
  <div class="regit">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="账号:">
        <el-input v-model="formInline.telphone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="formInline.password" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="姓名:">
        <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
        <el-input v-model="formInline.sex" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="学号:">
        <el-input v-model="formInline.studentId" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item label="学院:">
        <el-input v-model="formInline.academy" placeholder="请输入学院"></el-input>
      </el-form-item>
      <el-form-item label="班级:">
        <el-input v-model="formInline.class" placeholder="请输入班级"></el-input>
      </el-form-item>
      <el-form-item label="楼宇:">
        <el-select v-model="formInline.buildName" placeholder="请选择所在楼宇">
          <el-option v-for='item in build' :key='item.vaue' :label="item.value" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="宿舍号:">
        <el-input v-model="formInline.docId" placeholder="请输入宿舍号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      build: [],
      formInline: {
        telPhone: '',
        password: '',
        name: '',
        sex: '',
        docId: '',
        studentId: '',
        buildName: '',
        class: '',
        academy: ''

      }
    }
  },
  methods: {
    /**
  * 查询楼宇列表
  */
    getBuildInfo() {
      this.$buildNameService.getInfo().then(res => {
        console.log(res)
        this.build = res
      })
    },
    /**
     * 注册信息
     */
    getAddInfo() {
      this.$peopleInfoService.addInfo(this.formInline)
    },
    /**
     * 提交按钮
     */
    onSubmit() {
      this.getAddInfo()
      this.$parent.showRegit = false
      this.$parent.showLogin = true
    }

  },
  created() {
    this.getBuildInfo()
  },

}
</script>

<style lang='less' scope>
.regit {
  width: 600px;
  height: 750px;
  float: right;
  background: rgba(203, 211, 221, 0.719);
  margin-right: 140px;
  margin-top: 150px;
  .el-form {
    .el-form-item {
      display: block;
      margin: 33px 0 0px 110px;
      .el-form-item__label {
        font-size: 17px;
      }
      .el-input {
        width: 260px;
      }
      .el-button {
        margin-left: 150px;
        padding: 12px 36px;
      }
    }
  }
}
</style>
