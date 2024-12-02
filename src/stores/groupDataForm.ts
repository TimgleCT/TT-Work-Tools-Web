import { QueryGroupTypeEnum, GroupStatisticsSettingsEnum, GroupStatisticsColumnsEnum } from '@/enums/groupEnum'
import { IGroupInStorage } from '@/service/GroupsService/index.d'
import { IProductInStorage } from '@/service/ProductsService/index.d'
import { IGroupStatisticsShowColumnsSettings } from '@/views/Group/Statistics/index.d'
import { defineStore } from 'pinia'
import { getLocal, setLocal } from '@/service/LocalStorageService'

interface GroupDataForm {
    queryType: QueryGroupTypeEnum
    queryStartDate: number
    queryEndDate: number
    productList: IProductInStorage
    groupList: IGroupInStorage
    isLoading: boolean
    filterProduct: string | null
    statisticsSettings: {
      [GroupStatisticsSettingsEnum.STATISTIC_SHOW_COLUMNS]: IGroupStatisticsShowColumnsSettings
    }
}

export const useGroupDataFormStore = defineStore('useGroupDataFormStore', {
  state: (): GroupDataForm => ({
    queryType: QueryGroupTypeEnum.BY_CREATE_DATE,
    // 預設為上個月 0:0:0
    queryStartDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0, 0, 0, 0),
    // 預設為今天 0:0:0
    queryEndDate: new Date().setHours(0, 0, 0, 0),
    productList: { productList: [], updateAt: 0 },
    groupList: { groupList: [], updateAt: 0 },
    isLoading: false,
    filterProduct: null,
    statisticsSettings: {
      [GroupStatisticsSettingsEnum.STATISTIC_SHOW_COLUMNS]: getLocal(GroupStatisticsSettingsEnum.STATISTIC_SHOW_COLUMNS).data ?? {
        [GroupStatisticsColumnsEnum.PRODUCT_NAME]: true,
        [GroupStatisticsColumnsEnum.VENDOR_NAME]: true,
        [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_THE_MONTH]: true,
        [GroupStatisticsColumnsEnum.REVENUE_SUM]: true,
        [GroupStatisticsColumnsEnum.ORDER_COUNT]: true,
        [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_MONTH]: true,
        [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_TOTAL]: true,
      }
    },
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
    },
    getFilterProduct(): string | null {
      return this.filterProduct
    },
    getStatisticShowColumns(): IGroupStatisticsShowColumnsSettings {
      return this.statisticsSettings.statisticShowColumns
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
    },
    setFilterProduct(filterProduct: string) {
      this.filterProduct = filterProduct
    },
    setStatisticShowColumns(statisticShowColumns: IGroupStatisticsShowColumnsSettings) {
      this.statisticsSettings.statisticShowColumns = statisticShowColumns
      setLocal(GroupStatisticsSettingsEnum.STATISTIC_SHOW_COLUMNS, statisticShowColumns)
    }
  },
})