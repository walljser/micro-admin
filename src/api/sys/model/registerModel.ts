/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-17 10:16:21
 * @LastEditTime: 2022-11-17 14:43:21
 * @LastEditors: YUSHIJIE
 * @Usage:
 */

import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel';

export interface RegisterAccountModel {
  mobile: string;
  password: string;
  confirmPassword: string;
  smsCode: string;
}

export interface GetAccountInfoModel {
  email: string;
  name: string;
  introduction: string;
  phone: string;
  address: string;
}

export interface RegisterInfo {
  id: string;

  username: string;

  mobile: string;

  email: string;

  status: number;

  platform: number;

  isSuper: number;

  token: string;
}

export type RegisterResult = RegisterInfo;
