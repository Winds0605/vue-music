import jsonp from '../common/js/jsonp'
import { commonParams, options, url } from './config'
import axios from 'axios'

export function getHotKey() {
  const _url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(_url, data, options)
}

export function search(query, page, zhida, perpage) {
  const _url = `${url}/search`
  let body = {
    query,
    page,
    zhida,
    perpage
  }
  return axios.post(_url, body).then((res) => {
    return Promise.resolve(res.data)
  })
}