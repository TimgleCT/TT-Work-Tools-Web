import { RouteRecordRaw } from 'vue-router'
import { ErrorPage404 } from '@/router/constant'
import { PageEnum } from '@/enums/pageEnum'

export const LoginRoute: RouteRecordRaw = {
  path: PageEnum.LOGIN,
  name: PageEnum.LOGIN_NAME,
  component: () => import('@/views/Login/index.vue'),
  meta: {
    title: '登入',
  },
};

export const HttpErrorPage: RouteRecordRaw[] = [
  {
    path: '/error/404',
    name: PageEnum.ERROR_PAGE_NAME_404,
    component: ErrorPage404,
    meta: {
      title: PageEnum.ERROR_PAGE_NAME_404,
    },
  }
]
