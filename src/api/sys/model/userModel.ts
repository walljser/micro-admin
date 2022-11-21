/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-16 09:39:11
 * @LastEditTime: 2022-11-17 14:43:56
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  id: string;

  username: string;

  mobile: string;

  email: string;

  status: number;

  platform: number;

  isSuper: number;

  token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  // roles: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  username: string;
  // 真实名字
  mobile: string;
  // 头像
  email: string;
  // 介绍
}
