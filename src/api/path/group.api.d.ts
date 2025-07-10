import { IGroup, IKol, IProduct } from "@/views/Group/List/index.d"

export interface IQueryGroupListApi {
    page: number
    keyword: string
    eyid: number
    sort: string
    sort_by: string
    dpid: number
    kid: number
    type: string
}

export interface IQueryGroupListApiResult {
    groups: {
        groups: {
            current_page: number,
            data: IGroup[],
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
    kols: IKol[]
    prods: IProduct[]
}
