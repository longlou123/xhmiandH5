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


//时间格式化函数
Date.prototype.format = function(fmt) {
  var o = {
      "M+": this.getMonth() + 1,               //月份 
      "d+": this.getDate(),                    //日 
      "h+": this.getHours(),                   //小时 
      "m+": this.getMinutes(),                 //分 
      "s+": this.getSeconds(),                 //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}



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
