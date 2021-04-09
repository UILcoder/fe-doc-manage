/**
 * 使用方法：
 * Local为本地缓存，Session为会话缓存
 * import { Local, Session } from '@/utils/storage'
 *
 */

const EXPIRE_KEY = '__expires';
// 无限时间
const InfinityTime = -1;

class Storage {
  constructor(storageType) {
    this.storageType = storageType
  }

  /**
   * 存值，这里注意无需进行Object的转换，存什么都可以，方法内部会自动做类型转换
   * @param {*} key 存储key
   * @param {*} value 存储值
   * @param {*} time 有效时间，默认为永久
   */
  set(key, value, time = InfinityTime) {
    const data = {
      [EXPIRE_KEY]: time === InfinityTime ? time : Date.now() + time,
      value
    };

    global[this.storageType].setItem(key, JSON.stringify(data))
  }

  has(key) {
    return this.get(key) !== null
  }


  /**
   * 取值，这里如果是JsonObject类型会自动帮你转回原类型
   * 取值后无需再多做一次类型转换
   * @param {*} key
   * @param {*} defaultVal 默认值
   */
  get(key, defaultVal = null) {
    const data = global[this.storageType].getItem(key);
    if (data) {
      const parsedData = JSON.parse(data);
      const expireTime = parsedData[EXPIRE_KEY];
      if (expireTime === InfinityTime || expireTime >= Date.now()) {
        return parsedData.value
      }
      // 过期则清空对应key数据
      this.del(key)
    }
    return defaultVal
  }

  del(key) {
    global[this.storageType].removeItem(key)
  }

  clear() {
    global[this.storageType].clear()
  }
}

export const Local = new Storage('localStorage')

export const Session = new Storage('sessionStorage')
