/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-16 09:39:11
 * @LastEditTime: 2022-11-18 14:53:02
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import { defHttp } from '@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/m/menu/all_list',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};
