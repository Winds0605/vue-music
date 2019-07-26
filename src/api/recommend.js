import jsonp from '../common/js/jsonp'
import { commonParams, options, url } from './config'
import axios from 'axios'
import qs from 'qs'


// 获取轮播图 jsonp数据
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

//获取歌单数据
export function getDiscList() {
  const _url = `${url}/getDiscList`
  return axios.get(_url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取歌单详细
export function getSongList(disstid) {
  const _url = `${url}/getDiscDetail`
  let params = {
    disstid: disstid
  }
  let body = qs.stringify(params)
  return axios.post(_url, body).then((res) => {
    return Promise.resolve(res.data)
  })
}