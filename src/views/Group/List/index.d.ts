export interface IEmployee {
    eyid: null | number
    name: null | string
    created_at: null | string
    updated_at: null | string
    deleted_at: null | string
}

export interface IKol {
    kid: null | number
    number: null | string
    level: null | number
    kol_name: null | string
    name: null | string
    phone: null | string
    city_id: null | number
    local_id: null | number
    address: null | string
    receive_remark: null | string
    email: null | string
    tag: null | string
    tag_ids: null | string
    coop_fee: null | string
    base_fee: null | string
    profit: null | number
    cooperate_remark: null | string
    ig: null | string
    ig_fans: null | number
    fb: null | string
    fb_fans: null | number
    line: null | string
    line_fans: null | number
    yt: null | string
    yt_fans: null | number
    birthday: null | string
    avg_order: null | number
    avg_revenue: null | number
    created_at: null | string
    updated_at: null | string
    deleted_at: null | string
}

export interface IVendor {
    vid: null | number
    number: null | string
    vendorName: null | string
    company: null | string
    invoice: null | string
    account: null | string
    password: null | string
    name: null | string
    phone: null | string
    tel: null | string
    email: null | string
    city_id: null | number
    local_id: null | number
    address: null | string
    start: null | string
    end: null | string
    remark: null | string
    domain: null | string,
    host: null | string
    logo: null | string
    source: null | string
    path: null | string
    website: null | string
    socialMedia: null | string
    level: null | number
    execute: null | number
    created_at: null | string,
    updated_at: null | string,
    deleted_at: null | string
}

export interface IProduct {
    dpid: null | number
    vid: null | number
    prod: null | string
    prod_tag: null | string
    remark: null | string
    created_at: null | string
    updated_at: null | string
    deleted_at: null | string
    tags?: null | string[]
    vendor_name?: null | string
    vendorName?: null | string
    vendor?: null | IVendor
}

export interface IGroup {
    gid: null | number
    kid: null | number
    eyid: null | number
    startDate: null | string
    endDate: null | string
    brand: null | string
    dpid: null | number
    prod: null | string
    coop_fee: null | number
    base_fee: null | number
    profit: null | number
    ship: null | number
    prod_tag: null | string
    group_tag: null | string
    orderNum: null | number
    saleNum: null | number
    revenue: null | number
    created_at: null | string
    updated_at: null | string
    deleted_at: null | string
    tags: null | string[]
    ey_name: null | string
    createDate: null | string
    employee: IEmployee
    kol: IKol
    daliprod: IProduct

    kol_name?: string
}

export interface IGroupStatistics {
    dp_id: number
    product_name: string
    vendor_id: null | number
    vendor_name: null | string
    create_group_count_by_the_month: number
    revenue_sum: number
    order_count: number
    [key: string]: any
}