import { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum'

// 路由白名单
const routerAllowList = [
  // 登入
  PageEnum.LOGIN_NAME,
]

export function createRouterGuards(router: Router) {
  // 前置
  router.beforeEach(async (to, from, next) => {
    // @ts-ignore
    if (!window.route) window.route = {params: {}}
    // @ts-ignore
    Object.assign(window.route.params, to.query)

    const isErrorPage = router.getRoutes().findIndex((item) => item.name === to.name);
    if (isErrorPage === -1) {
      next({ name: PageEnum.ERROR_PAGE_NAME_404 })
    }

    // @ts-ignore
    // if (!routerAllowList.includes(to.name) && !loginCheck()) {
    //   next({ name: PageEnum.BASE_LOGIN_NAME })
    // }
    next()
  })

  router.afterEach((to, _, failure) => {
    document.title = (to?.meta?.title as string) || document.title;
  })

  // 错误
  router.onError((error) => {
    console.log(error, '路由錯誤');
  });
}