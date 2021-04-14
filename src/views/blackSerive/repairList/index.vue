<template>
  <div>
    <over-all>
      <div slot="search">
        <span>损坏报修列表</span>
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
            prop="buildName"
            label="楼宇号">
          </el-table-column>
          <el-table-column
            prop="docId"
            label="宿舍号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="报修人">
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="dateTime"
            label="报修日期时间">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="报修详情">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)">删除</el-button>
              <el-button type="text">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      tableData: []
    }
  },
  components: {
    OverAll
  },
  methods: {
    /**
     * 查询报修列表
     */
    getRepair() {
      this.$repairService.getRepair().then(res => {
        this.tableData = res
      })
    }
  },
  created() {
    this.getRepair()
  }
}
</script>

<style lang="less" scoped>
span{
  font-size: 25px;
  font-weight: bold;
  color: #3d577a;
}
</style>
