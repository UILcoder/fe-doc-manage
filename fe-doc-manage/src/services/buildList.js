import api from '@/apis';
import Request from '@/utils/request'

const getInfo = (data) => {
  return Request.get(api.buildList.getInfo, { data, loading: true })
}
const addInfo = (data) => {
  return Request.post(api.buildList.addInfo, { data, loading: true })
}

export default { getInfo, addInfo }
