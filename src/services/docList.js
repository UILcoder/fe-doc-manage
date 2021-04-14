import api from '@/apis'
import Request from '@/utils/request'

const getInfo = (data) => {
  return Request.get(api.docList.getInfo, { data, loading: true })
}

const addInfo = (data) => {
  return Request.post(api.docList.addInfo, { data, loading: true })
}

export default { getInfo, addInfo }
