import type {AppRouteRecordRaw, AppRouteModule} from '@/router/types';

import {PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE} from '@/router/routes/basic';

import {mainOutRoutes} from './mainOut';
import {PageEnum} from '@/enums/pageEnum';
import {t} from '@/hooks/web/useI18n';
import {LAYOUT} from "@/router/constant";

// const modules = import.meta.globEager('./modules/**/*.ts');
const modules = import.meta.globEager('./vboot/**/*.ts');

const routeModuleList: AppRouteModule[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: 'Root',
    },
};

export const LoginRoute: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/sys/login/Login.vue'),
    meta: {
        title: t('routes.basic.login'),
    },
};

export const NoPowerRoute: AppRouteRecordRaw = {
  path: '/401',
  name: 'NoPower',
  component: () => import('@/views/sys/nopower/index.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// export const Ofmv: AppRouteRecordRaw = {
//     path: '/ofmv',
//     name: 'ofmv',
//     component: () => import('@/pages/oa/flow/main/view.vue'),
//     meta: {
//         title: '流程查看',
//     }
// };
//
// export const Ofme: AppRouteRecordRaw = {
//     path: '/ofme',
//     name: 'ofme',
//     component: () => import('@/pages/oa/flow/main/edit.vue'),
//     meta: {
//         title: '流程编辑',
//     }
// };

// Basic routing without permission
export const basicRoutes = [
    LoginRoute,
    NoPowerRoute,
    // Ofmv,Ofme,
    RootRoute,
    ...mainOutRoutes,
    REDIRECT_ROUTE,
    PAGE_NOT_FOUND_ROUTE,
];
