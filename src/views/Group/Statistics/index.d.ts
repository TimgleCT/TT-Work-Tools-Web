export interface IGroupStatistics {
    dp_id: number
    product_name: string
    vendor_id: null | number
    vendor_name: null | string
    create_group_by_the_month: number
    revenue_sum: number
    order_count: number
    [key: string]: any
}