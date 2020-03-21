<template>
  <scroll
    class="suggest"
    :data="result"
    :pullup="pullup"
    ref="suggest"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    @scrollToEnd="searchMore"
  >
    <!--  @scrollToEnd="searchMore" -->
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <button class="more" v-show="showBtn" @click="more">{{tip}}</button>
      <loading v-show="hasMore"></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { search } from "../../api/search";
const ERR_OK = 0
import { filterSinger } from "../../common/js/song";
import Scroll from "../../base/scroll/scroll";
import Loading from "../../base/loading/loading";
import Singer from "../../common/js/singer";
import { mapMutations, mapActions } from "vuex";
import { createSong } from "../../common/js/song";
import NoResult from "../../base/no-result/no-result";

const TYPE_SINGER = "singer";
const SEARCH_ALL_TYPE = 1018
const SEARCH_SONG = 1
let PAGENUM = 15

export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: false,
      beforeScroll: true,
      tip: '',
      pageNum: 15,
      showBtn: false,
    };
  },
  methods: {
    _search () {
      this.page = 1;
      this.pageNum = 15
      this.$refs.suggest.scrollTo(0, 0);
      search(this.query, this.pageNum, this.page, SEARCH_ALL_TYPE).then(res => {
        this.result = this._getResult(res.data.result);
        if (res.data.result.song.moreText) {
          this.tip = res.data.result.song.moreText
          this.showBtn = true
        }
      });
    },
    more (e) {
      if (e.target.innerText.indexOf('单曲')) {
        search(this.query, this.pageNum, this.page, SEARCH_SONG).then(res => {
          this.result = this.getSongResult(res.data.result);
          this.showBtn = false
          this._checkMore(res.data.result.songCount);
        })
      }
    },
    searchMore () {
      if (!this.hasMore) {
        return;
      }
      this.pageNum += 15;
      search(this.query, this.pageNum, this.page, SEARCH_SONG).then(res => {
        this.result = this.getSongResult(res.data.result);
        this._checkMore(res.data.result.songCount);
      });
    },
    _checkMore (songCount) {
      if (songCount > this.result.length) {
        this.hasMore = true;
      } else {
        this.hasMore = false;
      }
      // const song = data.song;
      // if (
      //   !song.songs.length ||
      //   !song.more
      // ) {
      //   this.hasMore = false;
      // }
      // console.log(this.hasMore)
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return "icon-mine";
      } else {
        return "icon-music";
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.name;
      } else {
        return `${item.name}-${filterSinger(item.ar)}`;
      }
    },
    getSongResult (data) {
      let ret = []
      if (data.songs) {
        data.songs.forEach(value => {
          ret.push({
            name: value.name,
            ar: value.artists,
            id: value.id
          })
        })
      }
      return ret
    },
    _getResult (data, flag = true) {
      let ret = [];
      if (data.artist && flag) {
        data.artist.artists.forEach(value => {
          ret.push({
            ...value,
            type: TYPE_SINGER
          })
        })
      }
      if (data.song) {
        ret = ret.concat(data.song.songs);
      }
      return ret;
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach(element => {
        if (element.id && element) {
          ret.push(element);
        }
      });
      return ret;
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.id,
          name: item.name,
          avatar: item.picUrl
        });
        this.$router.push({
          path: `/search/${singer.id}`
        });
        this.setSinger(singer);
      } else {
        createSong(item).then(res => {
          this.insertSong(res);
        });
      }
      this.$emit("select");
    },
    refresh () {
      this.$refs.suggest.refresh();
    },
    listScroll () {
      this.$emit("listScroll");
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    ...mapActions(["insertSong"])
  },
  watch: {
    query (val) {
      this._search();
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
@import '~common/stylus/mixin';

.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    padding: 0 30px;

    .suggest-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding-bottom: 20px;
    }

    .icon {
      flex: 0 0 30px;
      width: 30px;

      [class^='icon-'] {
        font-size: 14px;
        color: $color-text-d;
      }
    }

    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text-d;
      overflow: hidden;

      .text {
        no-wrap();
      }
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

.more {
  border-radius: 10px;
  color: #616161;
  background-color: #222222;
  border: 1px solid #616161;
  margin: 0 auto;
  position: relative;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
}
</style>
