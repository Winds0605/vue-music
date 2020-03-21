<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" :key="item.id" @click="selectItem(item)">
          <div class="icon">
            <img src width="100" height="100" v-lazy="item.coverImgUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.tracks">
              <span>{{index + 1}}</span>
              <span>{{song.second}}-{{song.first}}</span>
            </li>
          </ul>
        </li>
        <div class="other">
          <li class="item" v-for="item in other" :key="item.id" @click="selectItem(item)">
            <div class="icon">
              <img src width="100" height="100" v-lazy="item.coverImgUrl" />
            </div>
          </li>
        </div>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getTopList } from "../../api/rank";
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import { playlisthMixin } from "../../common/js/mixin";
import { mapMutations } from "vuex";

const ERR_OK = 0

export default {
  mixins: [playlisthMixin],
  data () {
    return {
      topList: [],
      other: []
    };
  },
  created () {
    this._getTopList();
  },
  methods: {
    async _getTopList () {
      try {
        const result = await getTopList()
        this.topList = result.data.list.slice(0, 4)
        this.other = result.data.list.slice(4)
      } catch (error) {
        throw error
      }
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length != 0 ? "60px" : "";
      this.$refs.rank.style.bottom = bottom;
      this.$refs.toplist.refresh();
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      });
      this.setTopList(item);
    },
    ...mapMutations({
      setTopList: "SET_TOP_LIST"
    })
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    height: 100%;
    overflow: hidden;

    .item {
      display: flex;
      margin: 0 20px;
      padding-top: 20px;
      height: 100px;

      &:last-child {
        padding-bottom: 20px;
      }

      .icon {
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
      }

      .songlist {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: $color-highlight-background;
        color: $color-text-d;
        font-size: $font-size-small;

        .song {
          no-wrap();
          line-height: 26px;
        }
      }
    }

    .other {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
