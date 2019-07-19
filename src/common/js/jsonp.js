import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}


function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // 可把字符串作为 URI 组件进行编码
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // substring() 方法用于提取字符串中介于两个指定下标之间的字符。
  return url ? url.substring(1) : ''
}