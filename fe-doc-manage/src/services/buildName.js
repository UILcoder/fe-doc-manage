import api from '@/apis'
import Request from '@/utils/request'

const getInfo = (data) => {
  return Request.get(api.buildName.getInfo, { data, loading: true })
}

export default { getInfo }
