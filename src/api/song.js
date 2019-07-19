import axios from 'axios'
import $ from 'jquery'
import { commonParams } from './config'

export function getSongUrl(songmid) {
  const url = 'http://47.102.110.34:3000/song'
  let body = {
    "songmid": songmid
  }
  let data = $.get(url, body)
  return data
}


export function getLyric(mid) {
  const url = 'http://47.102.110.34:3000/api/lyric'
  const data = Object.assign({}, commonParams, {
    songmid:mid,
    pcachetime: '1561273619175',
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

