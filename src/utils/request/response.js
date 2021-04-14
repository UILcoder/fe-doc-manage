import { Message } from 'element-ui';

// 后端请求状态码
const RES_CODE = {
  SUCCESS: 0, // 成功
  UNAUTHORIZED: 101, // 未授权
  NOT_LOGIN: 102, // 未登录
  UNBIND: 104, // 微信登录未绑定
  UNCONCERNED: 105, // 未关注公众号访问
  BOUND: 106, // 已绑定其他微信
  ORDER_NOT_EXIST: 2101, // 订单不存在
  CANCELED: -1,
  PATIENT_BOUND: 201 // 就诊人被绑定
}

const commonResponseCallback = ({
  response, options, resolve
}) => {
  const { code, data, message } = response
  // 请求完自动清除loading
  if (window._loading && options.loading) {
    window._loading.close();
    delete window._loading
  }
  // 成功返回
  if (code === RES_CODE.SUCCESS) {
    // 文件下载
    if (options.downLoadTag) {
      // type: 由于excel格式需要和后端保持匹配，所有由具体业务传入options中
      // eg: application/vnd.ms-excel / application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8
      const blob = new Blob([data], { type: options.type });
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      // 支持自定义文件名，对应属性options.fileName
      const fileName = options.fileName ? `${options.fileName}.xls` : '新建.xls'
      document.body.appendChild(a);
      a.setAttribute('style', 'display:none');
      a.setAttribute('href', objectUrl);
      a.setAttribute('download', fileName);
      a.click();
      URL.revokeObjectURL(objectUrl);
    } else {
      resolve(data)
    }
    return
  }

  // 有消息返回，且判断是否需要提示
  if (message) {
    options.errorTips && Message({
      message,
      type: 'error'
    });
  }
}

export default { commonResponseCallback, RES_CODE }
