<template>
  <div>
    <over-all>
      <div slot="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="负责人姓名:">
            <el-input v-model="formInline.leader" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="楼宇号:">
            <el-select v-model="formInline.buildName" placeholder="请选择楼宇号">
              <el-option v-for="item in build" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handle('search')">查询</el-button>
            <el-button type="primary" @click="handle('add')">新增</el-button>
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
            prop="buildName"
            label="楼宇号">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="address"
            label="家庭地址">
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号">
          </el-table-column>
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row, 'edit')">编辑</el-button>
              <el-button type="text" @click="handleClick(scope.row, 'delete')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </over-all>
    <add-list ref="addList"></add-list>
  </div>
</template>

<script>
import OverAll from '@/components/OverAll/index.vue';
import addList from '@/views/buildList/addList.vue';

export default {
  name: 'index',
  data() {
    return {
      formInline: {
        leader: '',
        buildName: ''
      },
      tableData: [],
      build: []
    }
  },
  components: {
    OverAll,
    addList
  },
  methods: {
    /**
     * 查询楼宇
     */
    getBuildInfo() {
      this.$buildNameService.getInfo().then(res => {
        this.build = res
      })
    },
    /**
     * 查询宿舍信息
     */
    getListInfo() {
      this.$buildListService.getInfo().then(res => {
        this.tableData = []
        if (!this.formInline.leader && !this.formInline.buildName) {
          this.tableData = res
        } else {
          res.forEach(i => {
            if ((i.buildName === this.formInline.buildName || !this.formInline.buildName) && (i.leader === this.formInline.leader || !this.formInline.leader)) {
              this.tableData.push(i)
            }
          })
        }
      })
    },
    /**
     * 查询、新增按钮
     */
    handle(item) {
      if (item === 'search') {
        this.getListInfo()
      } else {
        this.$refs.addList.dialogVisible = true
      }
    },

    /**
     * 编辑和删除
     */
    handleClick(item, type) {
      console.log(item, type)
    }
  },
  created() {
    this.getBuildInfo()
    this.getListInfo()
  }
}
</script>

<style scoped>

</style>
