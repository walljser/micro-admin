/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-16 09:39:13
 * @LastEditTime: 2022-11-18 17:23:00
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import { RoleEnum } from '@/enums/roleEnum';
import { defineComponent } from 'vue';

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  parentId: number; // 父节点id

  name: string; // 名称

  router: string; // 路由地址

  perms: string; // 权限
  /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */

  type: number;

  icon: string; // 图标名称

  orderNum: number; // 排序

  viewPath: string; // 页面地址

  keepalive: boolean; // 是否需要保持活跃状态

  isShow: boolean; // 是否显示

  meta: Partial<RouteMeta>;
  // name: string;

  // icon?: string;

  // path: string;

  // // path contains param, auto assignment.
  // paramPath?: string;

  // disabled?: boolean;

  // children?: Menu[];

  // orderNo?: number;

  // roles?: RoleEnum[];

  // meta?: Partial<RouteMeta>;

  // tag?: MenuTag;

  // isHide?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

// export type AppRouteModule = RouteModule | AppRouteRecordRaw;
export type AppRouteModule = AppRouteRecordRaw;
