
import axios from './axios'
import { topMap } from './config'

export function getTopList () {
  const url = '/toplist/detail'
  return axios.get(url)
}


export function getMusicList (name) {
  const url = `/top/list?idx=${topMap[name]}`
  return axios.get(url)
}
