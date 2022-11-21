import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/my',
  name: 'my',
  component: LAYOUT,
  redirect: '/my/demo/main',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'ant-design:trophy-outlined',
    title: '测试样例',
    orderNo: 5,
  },
  children: [
    {
      path: 'demo/cate',
      name: 'MyDemoCate',
      component: () => import('@/pages/my/demo/cate/index.vue'),
      meta: {
        title: 'DEMO分类',
        ignoreKeepAlive: false,
      },
    },
    {
      path: 'demo/main',
      name: 'MyDemoMain',
      component: () => import('@/pages/my/demo/main/index.vue'),
      meta: {
        title: 'DEMO清单',
        ignoreKeepAlive: false,
      },
    },
    {
      path: 'demo/main/edit',
      name: 'MyDemoMainEdit',
      component: () => import('@/pages/my/demo/main/edit.vue'),
      meta: {
        title: 'DEMO编辑',
        ignoreKeepAlive: false,
        isHide: true,
      },
    },
  ],
};

export default dashboard;
