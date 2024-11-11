import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './router-guards'
import { PageEnum } from '@/enums/pageEnum'
import { LoginRoute, HttpErrorPage } from '@/router/base'
import Layout from '@/layout/index.vue'

import modules from '@/router/modules'

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.GROUP,
    component: Layout,
    meta: {
      title: 'Root',
    },
    children: [
      LoginRoute,
      ...HttpErrorPage,
      modules.groupRoutes
    ]
  }
]


export const constantRouter: any[] = [...RootRoute];

export const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
})

export { createRouterGuards }