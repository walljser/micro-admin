import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import {AppRouteRecordRaw} from "@/router/types";
import {t} from "@/hooks/web/useI18n";

const dashboard: AppRouteModule = {
    path: '/oa',
    name: 'oa',
    component: LAYOUT,
    redirect: '/oa/flow/main',
    meta: {
        // hideChildrenInMenu: true,
        icon: 'ant-design:retweet-outlined',
        title: '流程管理',
        orderNo: 4,
    },
    children: [
        {
            path: 'flow/cate',
            name: 'oaFlowCate',
            component: () => import('@/pages/oa/flow/cate/index.vue'),
            meta: {
                title: '流程分类',
                ignoreKeepAlive: false,
                // icon: 'simple-icons:about-dot-me',
                // isHide: true,
            },
        },
        // {
        //     path: 'flow/cate/edit',
        //     name: 'oaFlowCateEdit',
        //     component: () => import('@/pages/oa/flow/cate/edit.vue'),
        //     meta: {
        //         title: '流程分类编辑',
        //         ignoreKeepAlive: false,
        //         isHide: true,
        //     },
        // },
        {
            path: 'flow/tmpl',
            name: 'oaFlowTmpl',
            component: () => import('@/pages/oa/flow/tmpl/index.vue'),
            meta: {
                title: '流程模板',
                ignoreKeepAlive: false,
                // icon: 'simple-icons:about-dot-me',
                // isHide: true,
            },
        },
        {
            path: 'flow/tmpl/edit',
            name: 'oaFlowTmplEdit',
            component: () => import('@/pages/oa/flow/tmpl/edit.vue'),
            meta: {
                title: '流程模板编辑',
                ignoreKeepAlive: false,
                isHide: true,
            },
        },
        {
            path: 'flow/main',
            name: 'oaFlowMain',
            component: () => import('@/pages/oa/flow/main/index.vue'),
            meta: {
                title: '流程实例',
                ignoreKeepAlive: false,
                // icon: 'simple-icons:about-dot-me',
                // isHide: true,
            },
        },
        {
            path: 'flow/main/edit',
            name: 'oaFlowMainEdit',
            component: () => import('@/pages/oa/flow/main/edit.vue'),
            meta: {
                title: '流程实例编辑',
                ignoreKeepAlive: false,
                isHide: true,
            },
        },
        {
            path: 'flow/main/view',
            name: 'oaFlowMainView',
            component: () => import('@/pages/oa/flow/main/view.vue'),
            meta: {
                title: '流程实例查看',
                ignoreKeepAlive: false,
                isHide: true,
            },
        },
    ],
};

export default dashboard;
