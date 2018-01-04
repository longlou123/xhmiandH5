// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import iView from 'iview'
import '../theme/dist/iview.css'

Vue.config.productionTip = false //来关闭生产模式下给出的提示
Vue.use(iView)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
