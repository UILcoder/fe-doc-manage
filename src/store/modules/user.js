import { Session } from '@/utils/storage'

const user = {
  state: {
    userInfo: Session.get('userInfo'), // 用户信息
  },

  mutations: {
    setUserInfo: (state, payload) => {
      state.userInfo = { ...payload };
      Session.set('userInfo', state.userInfo, 50000);
    },
  },

  actions: {
    setUserInfo({ commit }, payload) {
      commit('setUserInfo', payload);
    }
  }
};

export default user;
