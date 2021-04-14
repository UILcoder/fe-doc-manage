<template>
  <div>
    <el-dialog title="输入宿舍评分" :visible.sync="dialogVisible" width="60%">
      <el-form :inline="true" :model="addlist" class="demo-form-inline">
        <el-form-item label="时间:">
          <el-date-picker v-model="addlist.date" type="date" placeholder="选择日期" required>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="宿舍号:">
          <el-input v-model="addlist.docId" placeholder="请输入宿舍号" required></el-input>
        </el-form-item>
        <el-form-item label="宿舍长:">
          <el-input v-model="addlist.docLeader" placeholder="请输入宿舍长" required></el-input>
        </el-form-item>
        <el-form-item label="卫生评分:">
          <el-input v-model="addlist.clearScore" placeholder="请输入卫生评分" required></el-input>
        </el-form-item>
        <el-form-item label="纪律评分:">
          <el-input v-model="addlist.discipline" placeholder="请输入纪律评分" required></el-input>
        </el-form-item>
        <el-form-item label="宿舍文化:">
          <el-input v-model="addlist.culture" placeholder="请输入宿舍文化" required></el-input>
        </el-form-item>
        <el-form-item label="所在楼宇:">
          <el-select v-model="addlist.buildName" placeholder="请选择所在楼宇" clearable>
            <el-option v-for="item in build" :key="item.value" :label="item.value" :value="item.value" required></el-option>
          </el-select>
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
        date: '',
        docId: '',
        docLeader: '',
        clearScore: '',
        discipline: '',
        culture: '',
        buildName: '',
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
      const params = this.addlist
      params.docMembers = this.addlist.docMembers.split(',')
      this.$docListService.addInfo(params)
    },

    /**
     * 确定按钮
     */
    handle() {
      this.addInfo()
      this.$parent.getdocInfo()
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
