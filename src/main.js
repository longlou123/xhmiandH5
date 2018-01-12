// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import iView from 'iview'
import '../theme/iview.css'
import MintUI from 'mint-ui'
import qs from 'qs'
import 'mint-ui/lib/style.css'


import {post,get,patch,put} from '@/script/http'
import {delCookie,getCookie, setSession, getSession} from '@/script/util'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;





Vue.config.productionTip = false //来关闭生产模式下给出的提示
Vue.use(iView)
Vue.use(MintUI)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
