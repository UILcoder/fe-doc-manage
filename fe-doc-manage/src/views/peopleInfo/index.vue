<template>
  <div>
    <over-all>
      <div slot="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名:">
            <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-input v-model="formInline.user" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="学号:">
            <el-input v-model="formInline.user" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="学院:">
            <el-input v-model="formInline.user" placeholder="请输入学院"></el-input>
          </el-form-item>
          <el-form-item label="班级:">
            <el-input v-model="formInline.user" placeholder="请输入班级"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="formInline.user" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="所在楼宇:">
            <el-select v-model="formInline.region" placeholder="请选择所在楼宇">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宿舍号:">
            <el-input v-model="formInline.user" placeholder="请输入宿舍号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </over-all>
  </div>
</template>

<script>
import OverAll from '@/components/OverAll/index.vue';

export default {
  name: 'index',
  data() {
    return {
      formInline: {}
    }
  },
  components: {
    OverAll
  }
}
</script>

<style lang="less" scoped>
.el-button{
  display: block;
  margin-top: 20px;
  float: right;

}
</style>
