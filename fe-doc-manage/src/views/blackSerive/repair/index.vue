<template>
  <div>
    <over-all>
      <div slot="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="报修人:">
            <el-input v-model="formInline.name" placeholder="请输入负责人姓名"></el-input>
          </el-form-item>
          <el-form-item label="报修时间:">
            <el-date-picker v-model="formInline.dateTime" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="楼宇号:">
            <el-select v-model="formInline.buildName" placeholder="请选择楼宇号">
              <el-option v-for="item in build" :key="item.value" :label="item.value" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input v-model="formInline.telphone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="宿舍号:">
            <el-input v-model="formInline.docId" placeholder="请输入宿舍号"></el-input>
          </el-form-item>
          <el-form-item label="问题描述:">
            <el-input type="textarea" v-model="formInline.detail"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handle('submit')">提交</el-button>
            <el-button type="primary" @click="handle('add')">新增</el-button>
          </el-form-item>
        </el-form>
        <div class="alert">
          <span><b>温馨提示：</b>你好！同学，如有紧急报修项目请与楼管或者直接拨打后勤服务热线：0552-888888</span>
          <span>如不影响正常的学习以及生活，请按要求填写申请表单，谢谢你的配合！</span>
        </div>
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
      formInline: {
        name: '',
        dateTime: '',
        buildName: '',
        telphone: '',
        docId: '',
        detail: ''
      },
      build: []
    }
  },
  components: {
    OverAll
  },
  methods: {
    /**
     * 查询楼宇列表
     */
    getBuildInfo() {
      this.$buildNameService.getInfo().then(res => {
        this.build = res
      })
    },
    /**
     * 提交信息
     */
    submitInfo() {
      this.$repairService.submit(this.formInline)
    },
    /**
     * 提交、新增按钮
     */
    handle(item) {
      if (item === 'submit') {
        this.submitInfo()
      } else {
        this.formInline = {}
      }
    }
  },
  created() {
    this.getBuildInfo()
  }
}
</script>

<style lang="less" scoped>
.el-form-item::before {
  content: "*";
  position: relative;
  left: -13px;
  color: red;
  top: 32px;
}
.el-form-item:last-child:before {
  content: "";
}
.el-form-item:last-child {
  margin: 110px 0 0 70px;
}
.el-form-item {
  margin-right: 30px;
  margin-bottom: 30px;
  ::v-deep .el-textarea__inner {
    width: 130% !important;
  }
  .el-button {
    margin: 50px 0 0 50px;
  }
  .el-button:first-child {
    margin-left: 300px;
  }
}
.alert {
  width: 70%;
  margin: 80px auto 0;
  text-align: center;
  span {
    color: red;
    font-size: 10px;
    display: block;
    line-height: 1.5em;
  }
}
</style>
