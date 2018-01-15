import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test1 from '@/pages/test1'
import doorCard from '@/pages/doorCard'
import management from '@/pages/management'
import authorization from '@/pages/authorization'
// import project from '@/pages/project'
import entranceGuard from '@/pages/entranceGuard'
import activateCard from '@/pages/activateCard'
import callerInvite from '@/pages/callerInvite'
import doorEmpower from '@/pages/doorEmpower'
import callerNodepad from '@/pages/callerNodepad'
import details from '@/pages/details'
import twoDimension from '@/pages/twoDimension'
import callerDetail from '@/pages/callerDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'management',
      component: management
    },
    {
      path: '/doorCard',
      name: 'doorCard',
      component: doorCard
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: authorization
    },
    {
      path: '/entranceGuard',
      name: 'entranceGuard',
      component: entranceGuard
    },{
      path: '/activateCard',
      name: 'activateCard',
      component: activateCard
    },{
      path: '/details',
      name: 'details',
      component: details
    },
    //二维码访客邀请
    {
      path: '/callerInvite',
      name: 'callerInvite',
      component: callerInvite
    },
    {
      path: '/doorEmpower',
      name: 'doorEmpower',
      component: doorEmpower
    },
    {
      path: '/callerNodepad',
      name: 'callerNodepad',
      component: callerNodepad
    },
    {
      path: '/callerDetail',
      name: 'callerDetail',
      component: callerDetail
    },
    {
      path: '/twoDimension',
      name: 'twoDimension',
      component: twoDimension
    },
  ]
})
