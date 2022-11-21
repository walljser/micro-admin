import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/ass',
  name: 'Ass',
  component: LAYOUT,
  redirect: '/ass/dict/cate',
  meta: {
    // hideChildrenInMenu: true,
    icon: 'ant-design:tool-outlined',
    title: '辅助工具',
    orderNo: 3,
  },
  children: [
    // {
    //   path: '/ass/dict/cate',
    //   name: 'AssDictCate',
    //   component: () => import('@/pages/ass/dict/cate/index.vue'),
    //   meta: {
    //     title: '字典分类',
    //     ignoreKeepAlive: false,
    //     // icon: 'simple-icons:about-dot-me',
    //     // isHide: true,
    //   },
    // },
    {
      path: '/ass/dict/main',
      name: 'AssDictMain',
      meta: {
        title: '字典管理',
        ignoreKeepAlive: false,
      },
      component: () => import('@/pages/ass/dict/main/index.vue'),
    },
    {
      path: '/ass/dict/data/:id',
      name: 'AssDictData',
      meta: {
        title: '字典选项',
        isHide: true,
        ignoreKeepAlive: false,
      },
      component: () => import('@/pages/ass/dict/data/index.vue'),
    },
    {
      path: '/ass/num/main',
      name: 'AssNumMain',
      meta: {
        title: '编号策略',
        ignoreKeepAlive: false,
      },
      component: () => import('@/pages/ass/num/main/index.vue'),
    },
  ],
};

export default dashboard;
