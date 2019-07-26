import axios from 'axios'
import $ from 'jquery'
import { commonParams, url } from './config'

// 获取歌曲链接
export function getSongUrl(songmid) {
  const _url = `${url}/song`
  let body = {
    "songmid": songmid
  }
  let data = $.post(_url, body)
  return data
}

//获取歌词 
export function getLyric(mid) {
  const _url = `${url}/lyric`
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: '1561273619175',
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })

  return axios.get(_url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

