<template>
  <div>
    <Header />
  <div class="app-wrapper">
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <app-main />
      </div>
  </div>
  </div>
</template>

<script>
import { Header, AppMain, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Header,
    AppMain,
    Sidebar,
  },
}
</script>

<style lang="less" scoped>
  @import "../assets/styles/sidebar.less";

  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    top:50px;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - @sideBarWidth);
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
