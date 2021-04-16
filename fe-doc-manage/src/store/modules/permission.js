import constantRoutes from '@/router/routes'
import { Session } from '../../utils/storage'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  // console.log(route)
  return route.role.includes(roles)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = route
    if (hasPermission(roles, tmp)) {
      res.push(tmp)
    }
  })
  console.log(res)
  return res
}

const state = {
  routes: Session.get('filterRoutes')
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
    Session.set('filterRoutes', state.routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 可以访问的路由
      let accessedRoutes = {}
      // 如果角色中包含admin角色
      const routes = constantRoutes.filter((i, index) => index > 1)
      accessedRoutes = filterAsyncRoutes(routes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
