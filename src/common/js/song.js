import axios from 'axios'
import { getSongUrl } from '../../api/song'
import { getLyric } from '../../api/song'
import { ERR_OK } from '../../api/config'
import { Base64 } from 'js-base64'


export default class Song {
  constructor({ id, mid, singer, name, album, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.image = image
    this.url = url
  }
}

export async function createSong (musicData) {
  let bacUrl = {}
  try {
    const result = await getSongUrl(musicData.id)
    bacUrl = result
  } catch (error) {
    throw error
  }
  let url = bacUrl.data.data[0].url
  return new Song({
    id: musicData.id,
    mid: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    image: musicData.al.picUrl,
    url
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  });
  return ret.join('/')
}
