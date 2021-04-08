<template>
  <div class="home">
   <div class="box">
     <h3>欢迎您!使用安徽科技学院宿舍管理系统</h3>
     <el-carousel :interval="4000" type="card" height="300px">
       <el-carousel-item v-for="url in urls" :key="url">
         <img  :src="url" />
       </el-carousel-item>
     </el-carousel>

   </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      urls: [
        require('../../assets/img/school_1.jpg'),
        require('../../assets/img/school_2.jpg'),
        require('../../assets/img/school-3.jpg'),
        require('../../assets/img/school-4.jpeg'),
        require('../../assets/img/school-5.jpeg'),
        require('../../assets/img/school-6.jpeg')
      ]
    }
  },
  components: {
  },
  mounted() {
    console.log('11111111111111111111111111111')
  }
};
</script>

<style lang="less" scoped>
.home{
  width: 100%;
  min-height: calc(100vh - 50px);
  background: @bg;
  padding: 1rem;
  box-sizing: border-box;

  .box{

    background: #ffffff;

    .el-carousel__item img {
      width: 100%;
      height: 100%;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }

    h3{
      padding: 20px 0;
      color: @light-blue;
      text-align: center;
    }
  }
}
</style>

