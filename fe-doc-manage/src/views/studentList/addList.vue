<template>
  <div>
    <el-dialog title="新增学生列表" :visible.sync="dialogVisible" width="60%">
      <el-form :inline="true" :model="addlist" class="demo-form-inline">
        <el-form-item label="姓名:">
          <el-input v-model="addlist.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-input v-model="addlist.sex" placeholder="请输入性别"></el-input>
        </el-form-item>
        <el-form-item label="学号:">
          <el-input v-model="addlist.studentId" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学院:">
          <el-input v-model="addlist.academy" placeholder="请输入学院"></el-input>
        </el-form-item>
        <el-form-item label="班级:">
          <el-input v-model="addlist.class" placeholder="请输入班级"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="addlist.telphone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所在楼宇:">
          <el-select v-model="addlist.buildName" placeholder="请选择所在楼宇">
            <el-option v-for="item in build" :key="item.value" :label="item.value" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号:">
          <el-input v-model="addlist.docId" placeholder="请输入宿舍号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'addList',
  data() {
    return {
      addlist: {
        name: '',
        studentId: '',
        sex: '',
        academy: '',
        class: '',
        telphone: '',
        buildName: '',
        docId: ''
      },
      dialogVisible: false,
      build: []
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
     * 新增学生信息
     */
    addInfo() {
      this.$peopleInfoService.addInfo(this.addlist)
    },

    /**
     * 确定按钮
     */
    handle() {
      this.addInfo()
      this.$parent.getInfo()
      this.dialogVisible = false
    }
  },
  mounted() {
    this.getBuildInfo()
  }
}
</script>

<style scoped>
</style>
