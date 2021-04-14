<template>
 <div class="header-wrapper">
   <div class="header-container">
     <div class="header-left">
       <img src="../../assets/img/proIcon.svg" class="proIcon">
       <div class="proName">安徽科技学院宿舍管理系统</div>
     </div>
     <div class="header-right">
       <span>当前用户:王晓悦</span>
       <span>修改密码</span>
       <span>退出</span>
     </div>
   </div>

 </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="less" scoped>
.header-wrapper{
  height: 50px;
  background-color: @headerColumn;
  position: fixed;
  width: 100%;
  z-index: 1001;
  top: 0;

  .header-container{
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 1rem;
    color: #fff;
  }
  .header-left{
    padding: 0 1rem;
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 1rem;

    .proIcon{
      width: 50px;
      height: 50px;
      margin-right: 2px;
    }
  }

  .header-right{
    display: flex;
    font-size: 0.75rem;

    span{
      margin-right: 1rem;
    }
  }

}
</style>
