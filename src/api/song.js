import axios from './axios'
import { topMap } from './config'

// 获取歌曲链接
export function getSongUrl (id) {
  const url = `/song/url?id=${id}`
  let data = axios.get(url)
  return data
}

//获取歌词 
export function getLyric (id) {
  const url = `/lyric?id=${id}`
  return axios.get(url)
}

export function getSongList (id) {
  const url = `/playlist/detail?id=${id}`
  return axios.get(url)
}
