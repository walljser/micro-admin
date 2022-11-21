/*
 * @Description:
 * @Author: YUSHIJIE
 * @Date: 2022-11-16 09:39:14
 * @LastEditTime: 2022-11-17 14:45:35
 * @LastEditors: YUSHIJIE
 * @Usage:
 */
import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { MenuModeEnum, MenuTypeEnum } from '@/enums/menuEnum';
import { RoleInfo } from '@/api/sys/model/userModel';

// Lock screen information
export interface LockInfo {
  // Password required
  pwd?: string | undefined;
  // Is it locked?
  isLock?: boolean;
}

// Error-log information
export interface ErrorLogInfo {
  // Type of error
  type: ErrorTypeEnum;
  // Error file
  file: string;
  // Error name
  name?: string;
  // Error message
  message: string;
  // Error stack
  stack?: string;
  // Error detail
  detail: string;
  // Error url
  url: string;
  // Error time
  time?: string;
}

export interface UserInfo {
  id: string;

  username: string;

  mobile: string;

  email: string;

  status: number;

  platform: number;

  isSuper: number;

  token: string;
  // userId: string | number;
  // username: string;
  // realName: string;
  // avatar: string;
  // desc?: string;
  // homePath?: string;
  // roles: RoleInfo[];
}

export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
