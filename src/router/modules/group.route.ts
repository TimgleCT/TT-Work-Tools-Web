import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.GROUP_NAME': () => import('@/views/Group/index.vue'),
  'PageEnum.GROUP_LIST_NAME': () => import('@/views/Group/List/index.vue'),
}

const projectRoutes: RouteRecordRaw = {
  path: PageEnum.GROUP,
  name: PageEnum.GROUP_NAME,
  component: importPath['PageEnum.GROUP_NAME'],
  meta: {
    title: '團購',
    isRoot: true
  },
  // children: [
  //   {
  //     path: PageEnum.GROUP_LIST,
  //     name: PageEnum.GROUP_LIST_NAME,
  //     component: importPath['PageEnum.GROUP_LIST_NAME'],
  //     meta: {
  //       title: '團購列表與統計'
  //     }
  //   }
  // ]
}

export default projectRoutes