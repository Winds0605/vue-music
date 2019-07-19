<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "../../components/music-list/music-list";
import { getSongList } from "../../api/recommend";
import { mapGetters } from "vuex";
import { ERR_OK } from "../../api/config";
import { createSongTwo } from "../../common/js/song";

export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  computed: {
    title() {
      return this.disc.dissname;
    },
    bgImage() {
      return this.disc.imgurl;
    },
    ...mapGetters(["disc"])
  },
  created() {
    this._getSongList();
  },
  methods: {
    _getSongList() {
      getSongList(this.disc.dissid).then(res => {
        if (res.code == ERR_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(musicData => {
        if (musicData.mid && musicData.album.mid) {
          createSongTwo(musicData).then(res => {
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