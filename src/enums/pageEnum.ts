import { ResultEnum } from '@/enums/httpEnum'

export enum PageEnum {
  // 登入
  LOGIN = '/login',
  LOGIN_NAME = 'Login',

  // 團購
  GROUP = '/group',
  GROUP_NAME = 'Group',

  // 團購列表
  GROUP_LIST = '/group/list',
  GROUP_LIST_NAME = 'GroupList',

  // 錯誤
  ERROR_PAGE_NAME_404 = 'ErrorPage404',

}

export const ErrorPageNameMap = new Map([
  [ResultEnum.NOT_FOUND, PageEnum.ERROR_PAGE_NAME_404],
])