// import Test from '@/views/Test.vue'

import Layout from '@/layout/index.vue'


export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/test',
        component: () => import(/* webpackChunkName: "test" */'@/views/Test.vue'),
        hidden: true
      },
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: '/test',
    children: [
      {
        path: 'test',
        name: 'test',
        meta: { title: '测试', noHeader: true, affix: true },
        component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue'),
      },
    ]
  },
  // {
  //   path: '**',
  //   redirect: {
  //     name: 'home'
  //   }
  // }
]

export const asyncRoutes = []
