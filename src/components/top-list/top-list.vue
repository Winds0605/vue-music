<template>
  <transition>
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from "../../components/music-list/music-list";
import { mapGetters } from "vuex";
import { getMusicList } from "../../api/rank";
import { createSong } from "../../common/js/song";

const ERR_OK = 0

export default {
  data () {
    return {
      songs: [],
      rank: true
    };
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.topList.topTitle;
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return "";
    },
    ...mapGetters(["topList"])
  },
  created () {
    this._getMusicList();
  },
  methods: {
    async _getMusicList () {
      if (!this.topList.id) {
        this.$router.push("/rank");
        return;
      }
      try {
        const result = await getMusicList(this.topList.name)
        this.songs = this._normalizeSongs(result.data.playlist.tracks);
      } catch (error) {
        throw error
      }

      // getMusicList(this.topList.id).then(res => {
      //   if (res.code === ERR_OK) {
      //     this.songs = this._normalizeSongs(res.songlist);
      //   }
      // });
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
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
