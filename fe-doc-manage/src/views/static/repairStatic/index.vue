<template>
  <div>
    <OverAll>
      <div slot="search">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="楼宇号:">
            <el-select v-model="formInline.buildName" placeholder="请选择楼宇号" clearable>
              <el-option v-for="item in build" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间:">
            <el-date-picker v-model="formInline.date" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handle('search')">查询</el-button>
            <el-button type="primary" @click="handle('add')">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div slot="table">

      </div>
    </OverAll>
    <add-list ref="addlist"></add-list>
  </div>
</template>

<script>
import OverAll from '@/components/OverAll/index.vue'
import addList from './addList.vue'

export default {
  name: 'index',
  components: {
    OverAll,
    addList
  },
  data() {
    return {
      formInline: {
        buildName: '',
        date: '',
      },
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
     * 查询，新增，删除按钮
     */
    handle(item) {
      if (item === 'search') {
        console.log()
      } else if (item === 'add') {
        this.$refs.addlist.dialogVisible = true
      } else {
        console.log()
      }
    }
  },
  mounted() {
    this.getBuildInfo()
  },
}
</script>
<style lang='less' scoped>
/deep/.el-form-item__label {
  margin-left: 35px;
}
</style>
