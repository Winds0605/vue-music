import axios from './axios'

// 获取轮播图
export function getRecommend () {
  const url = '/banner?type=2'
  return axios.get(url)
}

// 获取歌单数据
export function getDiscList () {
  const url = '/personalized'
  return axios.get(url)
}
