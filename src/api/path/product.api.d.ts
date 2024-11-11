import { IProduct, IVendor } from '@/views/Group/List/index.d'

export interface IQueryProductListApi {
    page: number
    keyword: string
    eyid: number
    sort: string
    sort_by: string
    dpid: number
    kid: number
}

export interface IQueryProductListApiResult {
    prods: {
        prods: {
            current_page: number
            data: IProduct[]
            first_page_url: string
            from: number
            last_page: number
            last_page_url: string
            next_page_url: string
            path: string
            per_page: number
            prev_page_url: string
            total: number
            to: number
        }
        lastPage: number
        paginates: number[]
    }
    vendors: IVendor[]
}