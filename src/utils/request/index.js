/**
 * 使用方法：
 * import Request from '@/utils/request';
 *
 *
 * // promise 写法
 * Request.get(url, options).then(() => {
 *
 * });
 *
 * Request.post(url, options) // 与get类似Request.post(url, options) // 与get类似
 *
 * options: {
 *  data: {}, // 请求参数
 *  onlyOnce: true, // 防止单位时间内多次无效请求  *【非axios自带】
 *  loading: true, // 是否需要全局loading（通常用于提交类操作）
 *  form: true,  // 处理是否以form格式发送 *【非axios自带】
 *  errorTips: true, // 是否提示错误信息 *【非axios自带】
 *  timeout: 3000, // 默认为3秒，如果业务特殊需要可调整
 *  headers: {}, // 向header中添加特殊值时使用（通常用不到）
 *  responseType, // 表示服务器响应的数据类型，默认json，也可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
 *  ... // note: 更多options，可以参考axios的config配置，均支持 http://www.axios-js.com/zh-cn/docs/
 * }
 *
 * 取消单一请求：
 * const req = Request.get('/api');
 * Request.cancel(req);
 *
 */
import axios from 'axios'

import CHANNEL from '@/constants'
import { stringify } from '../queryString'
import loading from './loading'
import Response from './response'

// 存储当前正在请求中的request对象，用于cancel时使用
const reqTokenMap = new Map()

// 用于存储onlyOnce请求
const uniqueRequestMap = {}

/**
 * 根据请求方法类型、参数、url拼接
 * @param {*} param
 */
const getUniqueRequestKey = ({ method, url, data }) => `${method}|${url}|${JSON.stringify(data)}`

/**
 * 防止重复请求逻辑
 * @param {*} { onlyOnce, ...config }
 * @returns
 */
const processOnlyOnce = (config, key) => {
  if (uniqueRequestMap[key]) {
    throw new Error({
      code: 10000,
      message: `${config.url}请勿重复请求`
    })
  }
  uniqueRequestMap[key] = true
}

/**
 * 根据传入对象中的config，将对应key从map中移除
 * @param {*} obj 传入对象需包含config
 */
const removeRequestFromUniqueMap = (uniqueKey) => {
  delete uniqueRequestMap[uniqueKey]
}

/**
 * 拼接url
 * @param {*} url
 * @param {*} str
 */
const appendUrl = (url, str) => `${url}${url.indexOf('?') > -1 ? '&' : '?'}${str}`

// 判断类型
const checkType = (data) => {
  return Object.prototype.toString.call(data).slice(8, -1)
}

const processForm = (config) => {
  config.headers = config.headers || {}
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  config.data = stringify(config.data)
}

const processUpload = (config) => {
  config.headers = config.headers || {}
  config.headers['Content-Type'] = 'multipart/form-data'
  const formData = new FormData()
  for (const key in config.data) {
    // 针对file进行特殊处理，业务页面自己处理也可
    if (key === 'files') {
      const targetType = checkType(config.data.files)
      if (targetType === 'Array') {
        config.data.files.forEach((file) => {
          formData.append('files', file.file); // files是键，file是值，就是要传的文件
        })
      } else {
        formData.append('files', config.data.files.file)
      }
    } else {
      // 其余的键值参数直接添加进formData
      formData.append(key, config.data[key])
    }
  }
  config.data = formData
}



// default settings
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Request-Source'] = CHANNEL

// axios使用的默认配置
const defaultConfig = {
  withCredentials: true,
  timeout: 10000
}
const instance = axios.create(defaultConfig)

// request 拦截
instance.interceptors.request.use(
  (config) => {
    // 拼接时间戳，防止请求缓存
    config.url = appendUrl(config.url, `_time=${Date.now()}`)
    return config
  },
  (error) => Promise.reject(error)
)

// response 拦截
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.toString() === 'Cancel') {
      return Promise.reject({ code: Response.RES_CODE.CANCELED })
    }
    return Promise.reject({
      code: 10000,
      message: '服务异常，请稍后再试'
    })
  }
)

const fetch = (options) => {
  // 声明取消请求时需使用的source
  const source = axios.CancelToken.source()

  const promise = new Promise((resolve, reject) => {
    const {
      onlyOnce, formTag, uploadTag, ...resetOptions
    } = options
    // 唯一Key
    const uniqueKey = getUniqueRequestKey(resetOptions)
    // 处理onlyOnce
    onlyOnce && processOnlyOnce(resetOptions, uniqueKey)
    // 处理form
    formTag && processForm(resetOptions)
    // 处理文件上传
    uploadTag && processUpload(resetOptions)
    // 是否开启loading
    loading && loading(resetOptions)
    instance({
      ...resetOptions,
      cancelToken: source.token
    }).then((response) => {
      Response.commonResponseCallback({
        response, options, resolve, reject
      })
      resolve()
    }).catch((response) => {
      Response.commonResponseCallback({
        response, options, resolve, reject
      })
      reject()
    }).finally(() => {
      reqTokenMap.delete(promise)
      removeRequestFromUniqueMap(uniqueKey)
    })
  })

  reqTokenMap.set(promise, source)

  return promise
}

// 默认配置
const defaultOptions = {
  onlyOnce: false,
  formTag: false,
  uploadTag: false,
  errorTips: true,
  downLoadTag: false
}

export default {
  get(url, options = {}) {
    return fetch({
      ...defaultOptions,
      ...options,
      url,
      method: 'get',
      params: options.data
    })
  },
  post(url, options = {}) {
    return fetch({
      ...defaultOptions,
      ...options,
      url,
      method: 'post'
    })
  },
  cancel(req) {
    // 当传入request时，则取消对应的请求
    if (req) {
      reqTokenMap.get(req).cancel()
      reqTokenMap.delete(req)
      return
    }
    for (const request of reqTokenMap.values()) {
      request.cancel()
    }
    reqTokenMap.clear()
  }
}
