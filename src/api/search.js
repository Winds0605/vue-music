import axios from './axios'

export function getHotKey () {
  const url = '/search/hot/detail'
  return axios.get(url)
}

export function search (keywords, limit, offset, type = 1018) {
  const url = `/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`
  return axios.get(url)
}
