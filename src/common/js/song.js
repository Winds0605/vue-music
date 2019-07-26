import axios from 'axios'
import { getSongUrl } from '../../api/song'
import { getLyric } from '../../api/song'
import { ERR_OK } from '../../api/config'
import { Base64 } from 'js-base64'
import { rejects } from 'assert';
import { resolve } from 'path';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}

export async function createSong(musicData) {
  let bacUrl = {}
  await getSongUrl(musicData.songmid).then((res) => {
    bacUrl = res
  })
  let url = bacUrl.req_0.data.midurlinfo[0].purl
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=259200`,
    url: `http://dl.stream.qqmusic.qq.com/${url}`
  })
}

export async function createSongTwo(musicData) {
  let bacUrl = {}
  await getSongUrl(musicData.mid).then((res) => {
    bacUrl = res
  })

  let url = bacUrl.req_0.data.midurlinfo[0].purl
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=259200`,
    url: `http://dl.stream.qqmusic.qq.com/${url}`
  })
}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  });
  return ret.join('/')
}