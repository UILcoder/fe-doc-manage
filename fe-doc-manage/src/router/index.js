
import Vue from 'vue';

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import VueRouter from 'vue-router'
import Request from '@/utils/request'
import { Session } from '@/utils/storage'
import store from '@/store'
import { constantRoutes } from './routes'


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // base: process.env.VUE_APP_PATH,
  routes: constantRoutes,
});

NProgress.configure({ showSpinner: false })



router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start()

  // 如果存在title，则赋值
  if (to.meta.title) {
    document.title = to.meta.title
  }
  Session.set('FROM_PAGE', from.name)
  // 取消当前请求
  Request.cancel()

  store.dispatch('permission/generateRoutes', ['admin'])

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router;
