import { GroupStatisticsColumnsEnum } from '@/enums/groupEnum'

export interface IGroupStatistics {
    dp_id: number
    product_name: string
    vendor_id: null | number
    vendor_name: null | string
    create_group_count_by_the_month: number
    create_group_count_by_total: number
    revenue_sum: number
    order_count: number
    [key: string]: any
}

export interface IGroupStatisticsShowColumnsSettings {
    [GroupStatisticsColumnsEnum.PRODUCT_NAME]: boolean
    [GroupStatisticsColumnsEnum.VENDOR_NAME]: boolean
    [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_THE_MONTH]: boolean
    [GroupStatisticsColumnsEnum.REVENUE_SUM]: boolean
    [GroupStatisticsColumnsEnum.ORDER_COUNT]: boolean
    [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_TOTAL]: boolean
    [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_MONTH]: boolean
}