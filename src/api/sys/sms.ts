/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-17 09:18:49
 * @LastEditTime: 2022-11-17 09:20:10
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '#/axios';

enum Api {
  RegisterSmsCode = '/c/sms/register',
}

/**
 * @description: user login api
 */
export function getRegisterSmsCode(mobile: string, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<boolean>(
    {
      url: Api.RegisterSmsCode,
      data: {
        mobile,
      },
    },
    {
      errorMessageMode: mode,
    },
  );
}
