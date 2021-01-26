
import store from '@/store'

import Request from '@/utils/request'
import api from '@/apis'

/**
 * 获取用户信息
 */
const getUserInfo = (data) => {
  return Request.post(api.user.info, { data, loading: true }).then(res => {
    store.dispatch('setUserInfo', res);
  })
}


export default { getUserInfo }
