import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/mon',
  name: 'Mon',
  component: LAYOUT,
  redirect: '/mon/log/login',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'ant-design:fund-outlined',
    title: '监控中心',
    orderNo: 2,
  },
  children: [
    {
      path: '/mon/online/user',
      name: 'MonOnlineUser',
      component: () => import('@/pages/mon/online/user/index.vue'),
      meta: {
        title: '在线用户',
        ignoreKeepAlive: false,
      },
    },
    {
      path: '/mon/log/login',
      name: 'MonLogLogin',
      component: () => import('@/pages/mon/log/login/index.vue'),
      meta: {
        title: '登录日志',
        ignoreKeepAlive: true,
      },
    },
    {
      path: '/mon/log/oper',
      name: 'MonLogOper',
      component: () => import('@/pages/mon/log/oper/index.vue'),
      meta: {
        title: '操作日志',
        ignoreKeepAlive: true,
      },
    },
    {
      path: '/mon/log/error',
      name: 'MonLogError',
      component: () => import('@/pages/mon/log/error/index.vue'),
      meta: {
        title: '错误日志',
        ignoreKeepAlive: true,
      },
    },
    {
      path: '/mon/job/main',
      name: 'MonJobMain',
      meta: {
        title: '定时任务',
        ignoreKeepAlive: false,
      },
      component: () => import('@/pages/mon/job/main/index.vue'),
    },
    {
      path: '/mon/job/log',
      name: 'MonJobLog',
      meta: {
        title: '定时任务日志',
        ignoreKeepAlive: false,
        isHide: true,
      },
      component: () => import('@/pages/mon/job/log/index.vue'),
    },
  ],
};

export default dashboard;
