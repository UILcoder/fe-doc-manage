
import Vue from 'vue';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import Request from '@/utils/request'
import { Session } from '@/utils/storage'
import store from '@/store'
import constantRoutes from './routes'


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // base: process.env.VUE_APP_PATH,
  // routes: Session.get('filterRouters'),
  routes: constantRoutes
});

NProgress.configure({ showSpinner: false })



router.beforeEach(async (to, from, next) => {
  // let menus = []

  // if (menus.includes(to.route)) {
  //   next()
  // } else {
  //   //进入没有权限的页面，或者默认的index
  // }
  // 进度条
  NProgress.start()
  console.log(NProgress)

  // 如果存在title，则赋值
  if (to.meta.title) {
    document.title = to.meta.title
  }
  console.log(to, from)
  Session.set('FROM_PAGE', to.name)
  // 取消当前请求
  Request.cancel()
  // store.dispatch('permission/generateRoutes', 'student')
  // store.dispatch('setUserInfo', 'aaa')
  if (to.path === '/login') {
    next();
    console.log(next)
  } else { // 每次页面跳转执行，token或openId錯誤，均提示跳转到首页
    const token = Session.get('userInfo');
    console.log(token, Session, store)
    if (token === null || token === '' || token === undefined) {
      console.log('token错误，请重新登录')
      next('/login');
    } else {
      next()
    }
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })

export default router;
