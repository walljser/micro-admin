/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-16 09:39:11
 * @LastEditTime: 2022-11-18 17:24:36
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import type { RouteMeta } from 'vue-router';
export interface RouteItem {
  parentId: number; // 父节点id

  name: string; // 名称

  router: string; // 路由地址

  perms: string; // 权限
  /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */

  type: number;

  icon: string; // 图标名称

  orderNum: number; // 排序

  path: string; // 页面地址

  keepalive: boolean; // 是否需要保持活跃状态

  isShow: boolean; // 是否显示

  meta: any;
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[];
