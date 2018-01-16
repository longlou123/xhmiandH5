import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test1 from '@/pages/test1'
import test2 from '@/pages/test2'
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
      path: '/test1',
      name: 'test1',
      component: test1,
      meta: {
        title: '测试列表',
      }
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2,
      meta: {
        title: '测试列表',
      }
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      meta: {
        title: '门卡管理',
      }
    },
    {
      path: '/doorCard',
      name: 'doorCard',
      component: doorCard,
      meta: {
        title: '门卡管理',
      }
    },
    {
      path: '/authorization',
      name: 'authorization',
      component: authorization,
      meta: {
        title: '授权门卡',
      }
    },
    {
      path: '/entranceGuard',
      name: 'entranceGuard',
      component: entranceGuard,
      meta: {
        title: '授权门禁',
      }
    },{
      path: '/activateCard',
      name: 'activateCard',
      component: activateCard,
      meta: {
        title: '激活门卡',
      }
    },{
      path: '/details',
      name: 'details',
      component: details,
      meta: {
        title: '门卡详情',
      }
    },
    //二维码访客邀请
    {
      path: '/callerInvite',
      name: 'callerInvite',
      component: callerInvite,
      meta: {
        title: '访客邀请',
      }
    },
    {
      path: '/doorEmpower',
      name: 'doorEmpower',
      component: doorEmpower,
      meta: {
        title: '授权门禁',
      }
    },
    {
      path: '/callerNodepad',
      name: 'callerNodepad',
      component: callerNodepad,
      meta: {
        title: '访客邀请记录',
      }
    },
    {
      path: '/callerDetail',
      name: 'callerDetail',
      component: callerDetail,
      meta: {
        title: '详情',
      }
    },
    {
      path: '/twoDimension',
      name: 'twoDimension',
      component: twoDimension,
      meta: {
        title: '访客邀请',
      }
    },
  ]
})
