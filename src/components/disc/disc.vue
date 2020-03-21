<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "../../components/music-list/music-list";
import { getSongList } from "../../api/song";
import { mapGetters } from "vuex";
import { createSong } from "../../common/js/song";

const ERR_OK = 0

export default {
  data () {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.disc.name;
    },
    bgImage () {
      return this.disc.picUrl;
    },
    ...mapGetters(["disc"])
  },
  created () {
    this._getSongList();
  },
  methods: {
    async _getSongList () {
      try {
        const result = await getSongList(this.disc.id)
        this.songs = this._normalizeSongs(result.data.playlist.tracks)
      } catch (error) {
        throw error
      }
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.id && musicData.al.id) {
          createSong(musicData).then(res => {
            ret.push(res);
          });
        }
      });
      return ret;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
