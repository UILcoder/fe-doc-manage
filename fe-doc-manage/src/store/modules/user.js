import { Session } from '@/utils/storage'

const user = {
  state: {
    userInfo: Session.get('userInfo'), // 用户信息
  },

  mutations: {
    setUserInfo: (state, payload) => {
      state.userInfo = { ...payload }
      // state.userInfo = { user: payload.userName, password: payload.password, role: payload.role }
      Session.set('userInfo', state.userInfo);
    },
  },

  actions: {
    setUserInfo({ commit }, payload) {
      console.log(payload)
      commit('setUserInfo', payload)
      // payload.then(res => {
      //   commit('setUserInfo', res)
      // })
    }
  }
};

export default user;
