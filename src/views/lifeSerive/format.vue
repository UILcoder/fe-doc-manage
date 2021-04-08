<template>
  <div>
    <overall>
      <div slot="search">
        <h2>{{title1}}</h2>
        <el-form :inline="true" :model = "formLine">
          <el-form-item :label="input1">
            <el-input v-model="formLine.input1" ></el-input>
          </el-form-item>
          <el-form-item :label="input2">
            <el-input v-model="formLine.input2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
        <hr>
        <h2>{{title2}}</h2>
        <p>请选择充值金额:</p>
        <div class="price">
          <el-button>10元</el-button>
          <el-button>30元</el-button>
          <el-button>50元</el-button>
          <el-button>100元</el-button>
        </div>
        <div class="price-btn">
        <el-button type="primary">充值</el-button>
        </div>
      </div>
    </overall>
  </div>
</template>

<script>
import Overall from '@/components/OverAll/index.vue';

export default {
  name: 'format',
  props: ['title1', 'title2', 'input1', 'input2'],
  components: {
    Overall
  },
  data() {
    return {
      formLine: {
        input1: '',
        input2: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form{
  /deep/.el-form-item__label{
    margin-left: 10px;
  }
  .el-button{
    margin-left: 30px;
  }
}
hr{
  margin: 30px 0;
}
p{
  font-size: 14px;
}
.price{
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.price-btn{
  width: 100%;
  .el-button{
    margin: 30px 40%;
  }

}
</style>
