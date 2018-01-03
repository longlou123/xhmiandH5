import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test1 from '@/pages/test1'
import test2 from '@/pages/test2'
import doorCard from '@/pages/doorCard'
import management from '@/pages/management'
import authorization from '@/pages/authorization'
import activateCard from '@/pages/activateCard'






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
    },
    {
      path: '/management',
      name: 'management',
      component: management
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: authorization
    },
    {
      path: '/activateCard',
      name: 'activateCard',
      component: activateCard
    },
  ]
})
