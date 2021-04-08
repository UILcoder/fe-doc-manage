<template>
  <div>
    <over-all>
      <div slot="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="宿舍号:">
            <el-input v-model="formInline.docId" placeholder="请输入宿舍号"></el-input>
          </el-form-item>
          <el-form-item label="楼宇号:">
            <el-select v-model="formInline.buildName" placeholder="请选择楼宇号" clearable>
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
            prop="docId"
            label="宿舍号">
          </el-table-column>
          <el-table-column
            prop="docLeader"
            label="宿舍长">
          </el-table-column>
          <el-table-column
            prop="leader"
            label="负责人">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleClick(scope.row)">编辑</el-button>
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
import addList from '@/views/docList/addList.vue';

export default {
  name: 'index',
  data() {
    return {
      formInline: {
        docId: '',
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
    getdocInfo() {
      this.$docListService.getInfo().then(res => {
        this.tableData = []
        res.forEach(i => {
          if (i.docMembers.length < 4) {
            i.status = '未满'
          } else {
            i.status = '已满'
          }
        })
        if (!this.formInline.docId && !this.formInline.buildName) {
          this.tableData = res
        } else {
          res.forEach(i => {
            if ((i.buildName === this.formInline.buildName || !this.formInline.buildName) && (i.docId === Number(this.formInline.docId) || !this.formInline.docId)) {
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
        this.getdocInfo()
      } else {
        this.$refs.addList.dialogVisible = true
      }
    }
  },
  created() {
    this.getBuildInfo()
    this.getdocInfo()
  }
}
</script>

<style scoped>

</style>
