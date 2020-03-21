<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerList } from "../../api/singer";
import Singer from "../../common/js/singer";
import ListView from "../../base/listview/listview";
import { mapMutations } from "vuex";
import pinyin from 'tiny-pinyin'
import { playlisthMixin } from "../../common/js/mixin";

const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
const ERR_OK = 0

export default {
  mixins: [playlisthMixin],
  data () {
    return {
      singers: []
    };
  },
  created () {
    this._getSingerList();
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = Object.keys(playlist).length > 0 ? "60px" : "";
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    async _getSingerList () {
      //获取歌手数据
      try {
        const result = await getSingerList(50)
        this.singers = this._normalizeSinger(result.data.artists);
      } catch (error) {
        throw error
      }
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      //对歌手数据做遍历
      list.forEach((item, index) => {
        //将前十条数据存入热门数组
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              name: item.name,
              id: item.id,
              avatar: item.picUrl
            })
          );
        }

        //将歌手首字母字段和歌手数据存入map的key数组中
        if (pinyin.isSupported()) {
          const key = pinyin.convertToPinyin(item.name.charAt(0)).charAt(0)
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          //将歌手数据存入对应的首字母数组中
          map[key].items.push(
            new Singer({
              name: item.name,
              id: item.id,
              avatar: item.picUrl
            })
          );
        }
      });

      //定义两个数组分别存热门歌手和其他歌手
      let hot = [];
      let ret = [];
      //遍历map数组 将热门歌手和其他歌手做分类分别存进ret和hot
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }

      //对ret进行排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      //将ret数组追加到hot数组 并作为整个函数的返回值
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  components: {
    ListView
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
