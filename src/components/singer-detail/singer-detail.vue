<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>
 
<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { getSingerList, getSingerDetail } from "../../api/singer";
import { createSong } from "../../common/js/song.js";
import MusicList from "../music-list/music-list";

const ERR_OK = 0

export default {
  data () {
    return {
      songs: []
    };
  },
  computed: {
    title () {
      return this.singer.name;
    },
    bgImage () {
      return this.singer.avatar;
    },
    ...mapGetters(["singer"])
  },
  created () {
    this._getDetail();
  },
  methods: {
    async _getDetail () {
      if (!this.singer.id) {
        this.$router.push("/singer");
        return;
      }
      try {
        const result = await getSingerDetail(this.singer.id)
        this.songs = this._normalizeSongs(result.data.hotSongs);
      } catch (error) {
        throw (error)
      }
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach(item => {
        if (item.id && item.al.id) {
          createSong(item).then(res => {
            ret.push(res);
          });
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
