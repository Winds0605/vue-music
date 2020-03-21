import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclcik from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

// Vue.config.productionTip = false

import './common/stylus/index.styl'

fastclcik.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./common/image/loader.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
