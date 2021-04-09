
import Request from '@/utils/request'
import api from '@/apis'

/**
 * 获取学生信息
 */
const getInfo = (data) => {
  return Request.get(api.peopleInfo.getInfo, { data, loading: true })
}

/**
 * 增加学生信息
 */
const addInfo = (data) => {
  return Request.post(api.peopleInfo.addInfo, { data, loading: true })
}

export default { getInfo, addInfo }
