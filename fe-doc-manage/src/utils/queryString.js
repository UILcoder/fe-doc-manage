/**
 * 参数的解析、序列化的标准模式 + 对象嵌套扩展
 *  按照规范空串解析不出来参数，但是空参数可以序列化（浏览器中表单元素 name 为空时无法序列化）
 * 规则
 *  1. null 没有 = 号
 *  2. undefined 无效
 *  3. 数组只能是基本类型
 *  4. 对象采用 a.b.c 作为 key
 *  5. { '': null } 会序列化为 ''
 *  6. 反序列化会丢失 key 为 ''，值为 null 的参数 // 规范
 *
 * 规范定义
 *  https://www.w3.org/TR/url/
 * 解析
 *  https://www.w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
 *  https://www.w3.org/TR/2014/WD-url-1-20141209/#urlencoded-parsing
 *  https://url.spec.whatwg.org/#urlencoded-parsing
 * 序列化
 *  https://www.w3.org/TR/2012/WD-url-20120524/#url-parameter-serialization
 *  https://www.w3.org/TR/2014/WD-url-1-20141209/#urlencoded-serializing
 *  https://url.spec.whatwg.org/#urlencoded-serializing
 *
 * Test
 *  console.assert(queryString.stringify(undefined) === '');
 *  console.assert(queryString.stringify(null) === '');
 *  console.assert(queryString.stringify(0) === '');
 *  console.assert(queryString.stringify(1) === '');
 *  console.assert(queryString.stringify('') === '');
 *  console.assert(queryString.stringify([]) === '');
 *  console.assert(queryString.stringify({}) === '');
 *  console.assert(queryString.stringify({ a: undefined }) === '');
 *  console.assert(queryString.stringify({ a: null }) === 'a');
 *  console.assert(queryString.stringify(['a']) === '0=a');
 *  console.assert(queryString.stringify(['a', 'b']) === '0=a&1=b');
 *  const query = { a: null, b: 'c', d: [null, 'e', 'f'], g: { h: 'i', j: ['k', 'l'] } };
 *  const search = queryString.stringify(query);
 *  console.assert(search === 'a&b=c&d&d=e&d=f&g.h=i&g.j=k&g.j=l');
 *  console.assert(util.deepEqual(query, queryString.parse(search)));
 *  console.assert(queryString.stringify({ '': [null, undefined, '', 'a'] }) === '&=&=a');
 *  console.assert(util.deepEqual({ '': ['', 'a'] }, queryString.parse('&=&=a')));
 */

const encode = encodeURIComponent
const decode = decodeURIComponent
const QUERY_REG = /&([^=&]*)(=?)([^&]*)/g
const MATCH = RegExp

function parser(search, parsing) {
  const temp = search.replace(/^[?&]?/, '&')
  while (QUERY_REG.exec(temp)) {
    if (MATCH['$&'].length > 1) {
      // RegExp.$X 不建议使用，但是是事实标准
      parsing(decode(MATCH.$1), MATCH.$2 ? decode(MATCH.$3) : null)
    }
  }
}

function prop(...args) {
  return args.filter((k) => typeof k === 'string').join('.')
}

function serializer(query, scope, serializing) {
  if (typeof scope === 'function') {
    serializing = scope
    scope = undefined
  }
  Object.keys(query).forEach((key) => {
    const value = query[key]
    if (Array.isArray(value)) {
      value.forEach((val) => serializing(prop(scope, key), val))
    } else if (value && typeof value === 'object') {
      serializer(value, prop(scope, key), serializing)
    } else {
      serializing(prop(scope, key), value)
    }
  })
}

export function parse(search, parsing) {
  const query = {}
  if (search) {
    parser(search, (key, value) => {
      if (parsing) {
        parsing(key, value)
      }
      let obj = query
      const keys = key.split('.')
      key = keys.pop()
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i]
        if (!(k in obj)) {
          obj[k] = {}
        }
        obj = obj[k]
      }
      if (!(key in obj)) {
        obj[key] = value
      } else if (Array.isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    })
  }
  return query
}

export function stringify(query, serializing) {
  const search = []
  if (query) {
    serializer(query, (key, value) => {
      if (serializing) {
        // 给外部暴露的 serializing
        serializing(key, value)
      }
      if (value === null) {
        search.push(encode(key))
      } else if (value !== undefined) {
        search.push(`${encode(key)}=${encode(value)}`)
      }
    })
  }
  return search.join('&')
}

export default {
  parse,
  stringify
}
