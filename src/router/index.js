import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test1 from '@/pages/test1'
import test2 from '@/pages/test2'
import doorCard from '@/pages/doorCard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'test1',
      component: test1
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/doorCard',
      name: 'doorCard',
      component: doorCard
    }
  ]
})
