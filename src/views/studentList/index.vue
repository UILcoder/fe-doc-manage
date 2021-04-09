<template>
<div>
  <over-all>
    <div slot="search">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名:">
          <el-input v-model="formInline.name" placeholder="请输入姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="学号:">
          <el-input v-model="formInline.studentId" placeholder="请输入学号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handle('search')">查询</el-button>
          <el-button type="primary" @click="handle('addList')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div slot="table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="studentId"
          label="学号">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="telphone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="academy"
          label="学院">
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级">
        </el-table-column>
        <el-table-column
          prop="buildName"
          label="楼宇号">
        </el-table-column>
        <el-table-column
          prop="docId"
          label="宿舍号">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </over-all>
  <add-list ref="addList"/>
</div>
</template>

<script>
import OverAll from '@/components/OverAll/index.vue';
import addList from '@/views/studentList/addList.vue'

export default {
  name: 'index',
  data() {
    return {
      formInline: {
        name: '',
        studentId: ''
      },
      tableData: []
    }
  },
  components: {
    OverAll,
    addList
  },
  methods: {

    /**
     * 查询学生信息列表
     */
    getInfo() {
      this.$peopleInfoService.getInfo().then(res => {
        this.tableData = []
        if (!this.formInline.name && !this.formInline.studentId) {
          this.tableData = res
        } else {
          res.forEach(i => {
            if ((i.name === this.formInline.name || !this.formInline.name) && (i.studentId === Number(this.formInline.studentId) || !this.formInline.studentId)) {
              this.tableData.push(i)
            }
          })
        }
      })
    },

    /**
     * 查询、新增、导出按钮
     */
    handle(item) {
      if (item === 'search') {
        this.getInfo()
      }
      if (item === 'addList') {
        this.$refs.addList.dialogVisible = true
      }
    },
    /**
     * 编辑按钮
     */
    handleClick(item) {
      console.log(item)
      this.$refs.addList.dialogVisible = true
      this.$refs.addList.addlist = item
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
