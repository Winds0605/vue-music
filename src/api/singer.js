import axios from './axios'

export function getSingerList (limit) {
  const url = `/top/artists?offset=0&limit=${limit}`
  return axios.get(url)
}

export function getSingerDetail (id) {
  const url = `/artists?id=${id}`
  return axios.get(url)
}
