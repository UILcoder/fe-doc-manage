import api from '@/apis';
import Request from '@/utils/request'

const submit = (data) => {
  return Request.post(api.repair.addInfo, { data, loading: true })
}

const getRepair = (data) => {
  return Request.get(api.repair.getInfo, { data, loading: true })
}

export default { submit, getRepair }
