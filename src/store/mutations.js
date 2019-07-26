import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    //通过mapMutations修改，不能直接修改数组或对象
    // 解决方法： 
    // 1.Object.assign({},list)
    // 2.JSON.parse(JSON.stringify(list))
    // 不建议使用第二种方法 性能差
    state.playlist = Object.assign([], list)
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = Object.assign([], list)
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = Object.assign([], history)
  }
}

export default mutations