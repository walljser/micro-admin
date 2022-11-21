/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-17 10:15:49
 * @LastEditTime: 2022-11-17 14:38:54
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '#/axios';
import { RegisterAccountModel, RegisterResult } from './model/registerModel';

enum Api {
  RegisterAccount = '/c/account/register',
}

/**
 * @description: user login api
 */
export function postRegisterAccount(
  registerModel: RegisterAccountModel,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.post<RegisterResult>(
    {
      url: Api.RegisterAccount,
      data: {
        username: registerModel.mobile,
        password: registerModel.password,
        smsCode: registerModel.smsCode,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}
