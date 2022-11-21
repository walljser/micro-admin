/**
The routing of this file will not show the layout.
It is an independent new page.
the contents of the file still need to log in to access
 */
import type { AppRouteModule } from '@/router/types';

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('@/views/demo/main-out/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
  {
    path: '/page/ofte',
    name: 'ofte',
    component: () => import('@/pages/oa/flow/tmpl/edit.vue'),
    meta: {
      title: '流程模板配置',
    }
  },
  {
    path: '/page/ofmv',
    name: 'ofmv',
    component: () => import('@/pages/oa/flow/main/view.vue'),
    meta: {
      title: '流程实例查看',
    }
  },
  {
    path: '/page/ofme',
    name: 'ofme',
    component: () => import('@/pages/oa/flow/main/edit.vue'),
    meta: {
      title: '流程实例编辑',
    }
  }
];

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name);
