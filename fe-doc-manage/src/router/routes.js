// import Test from '@/views/Test.vue'

import Layout from '@/layout/index.vue'


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    children: [
      {

        path: 'home',
        name: 'home',
        meta: {
          title: '首页', icon: 'home'
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/home/index'),
      },

    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [
      {

        path: 'user',
        name: 'user',
        meta: {
          title: '个人信息', icon: 'user'
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/peopleInfo/index'),
      },

    ]
  },
  {
    path: '/buildManage',
    component: Layout,
    redirect: '/buildManage',
    children: [
      {
        path: 'buildManage',
        name: 'buildManage',
        meta: {
          title: '楼宇列表', icon: 'build', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/buildList/index'),
      },
    ]
  },
  {
    path: '/list',
    component: Layout,
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'list',
        meta: {
          title: '宿舍列表', icon: 'doc', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/docList/index'),
      },
    ]
  },
  {
    path: '/studentManage',
    component: Layout,
    redirect: '/studentManage',
    children: [
      {
        path: 'studentManage',
        name: 'studentManage',
        meta: {
          title: '学生列表', icon: 'student', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/studentList/index'),
      },
    ]
  },
  {
    path: '/backSerive',
    component: Layout,
    redirect: '/backSerive',
    meta: { title: '后勤服务', icon: 'back' },
    children: [
      {
        path: 'repair',
        name: 'repair',
        meta: {
          title: '损坏报修', icon: 'use', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/blackSerive/repair/index'),
      },
      {
        path: 'repairList',
        name: 'repairList',
        meta: {
          title: '报修列表', icon: 'use', noHeader: true, affix: true
        },
        component: () => import('@/views/blackSerive/repairList/index')
      }
    ]
  },
  {
    path: '/lifeSerive',
    component: Layout,
    redirect: '/lifeSerive',
    meta: { title: '生活服务', icon: 'life' },
    children: [
      {
        path: 'eleBuy',
        name: 'eleBuy',
        meta: {
          title: '电费充值', icon: 'use', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/lifeSerive/eleBuy/index'),
      },
      {
        path: 'schoolBuy',
        name: 'schoolBuy',
        meta: {
          title: '校园网充值', icon: 'use', noHeader: true, affix: true
        },
        component: () => import('@/views/lifeSerive/schoolBuy/index')
      }
    ]
  },
  {
    path: '/static',
    component: Layout,
    redirect: '/static',
    meta: { title: '统计中心', icon: 'static' },
    children: [
      {
        path: 'Static',
        name: 'Static',
        meta: {
          title: '宿舍评分', icon: 'use', noHeader: true, affix: true
        },
        component: () => import(/* webpackChunkName: "test" */ '@/views/static/docStatic/index'),
      },
      {
        path: 'repairStatic',
        name: 'repairStatic',
        meta: {
          title: '报修统计', icon: 'use', noHeader: true, affix: true
        },
        component: () => import('@/views/static/repairStatic/index')
      }
    ]
  },
  {
    path: '**',
    redirect: {
      name: 'user'
    }
  }
]

export const asyncRoutes = []
