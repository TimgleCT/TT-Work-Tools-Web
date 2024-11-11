import { QueryGroupTypeEnum } from '@/enums/groupEnum'
import { IGroupInStorage } from '@/service/GroupsService/index.d'
import { IProductInStorage } from '@/service/ProductsService/index.d'
import { defineStore } from 'pinia'

interface GroupDataFormState {
    queryType: QueryGroupTypeEnum
    queryStartDate: number
    queryEndDate: number
    productList: IProductInStorage
    groupList: IGroupInStorage
    isLoading: boolean
}

export const useGroupDataFormStore = defineStore('useGroupDataFormStore', {
  state: (): GroupDataFormState => ({
    queryType: QueryGroupTypeEnum.BY_CREATE_DATE,
    // 預設為上個月 0:0:0
    queryStartDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0),
    // 預設為今天 0:0:0
    queryEndDate: new Date().setHours(0, 0, 0, 0),
    productList: { productList: [], updateAt: 0 },
    groupList: { groupList: [], updateAt: 0 },
    isLoading: false
  }),
  getters: {
    getQueryType(): QueryGroupTypeEnum {
      return this.queryType
    },
    getQueryStartDate(): number {
      return this.queryStartDate
    },
    getQueryEndDate(): number {
      return this.queryEndDate
    },
    getProductList(): IProductInStorage {
      return this.productList
    },
    getGroupList(): IGroupInStorage {
      return this.groupList
    },
    getIsLoading(): boolean {
      return this.isLoading
    }
  },
  actions: {
    setQueryType(type: QueryGroupTypeEnum) {
      this.queryType = type
    },
    setQueryStartDate(date: number) {
      this.queryStartDate = date
    },
    setQueryEndDate(date: number) {
      this.queryEndDate = date
    },
    setProductList(productList: IProductInStorage) {
      this.productList = productList
    },
    setGroupList(groupList: IGroupInStorage) {
      this.groupList = groupList
    },
    setIsLoading(isLoading: boolean) {
      this.isLoading = isLoading
    }
  },
})