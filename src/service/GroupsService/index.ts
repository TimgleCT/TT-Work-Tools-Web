import { IGroup, IGroupStatistics, IProduct } from '@/views/Group/List/index.d'
import { isCurrentMonth, getUniqueYearMonths, delay } from '@/utils'
import { getGroupListApi } from '@/api/path/group.api'
import { IQueryGroupListApi, IQueryGroupListApiResult } from '@/api/path/group.api.d'
import { setLocal, getLocal } from '@/service/LocalStorageService'
import { ILocalStorageObject } from '@/service/LocalStorageService/index.d'
import { IGroupInStorage } from './index.d'
import { QueryGroupTypeEnum } from '@/enums/groupEnum'

const filterGroupListByQueryDate = (column: 'startDate' | 'created_at', groupList: IGroup[], queryStartDate: Date, queryEndDate: Date): IGroup[] => {
    return groupList.filter((group) => {
        const groupDateString = group[column]
        if (!groupDateString) {
            return true
        }
        const groupDate = new Date(groupDateString)
        return groupDate >= queryStartDate && groupDate <= queryEndDate
    })
}

export const getGroupsByQuery = async(type: QueryGroupTypeEnum, queryStartDate: Date, queryEndDate: Date): Promise<IGroupInStorage> => {
    const allGroups = await getAllGroups()
    const targetColumn = (type === QueryGroupTypeEnum.BY_START_DATE) ? 'startDate' : 'created_at'
    return {
        groupList: filterGroupListByQueryDate(targetColumn, allGroups.groupList, queryStartDate, queryEndDate),
        updateAt: allGroups.updateAt
    }
}

export const getAllGroupsFromRemote = async(syncProgressCallBack?: (currentStep: number, totalStep: number) => void): Promise<IGroup[]> => {

    let totalPage = 1
    let groupQueryResultList: IGroup[] = []
    let params: IQueryGroupListApi = {
        page: 1,
        keyword: '',
        eyid: 0,
        sort: 'created_at',
        sort_by: 'desc',
        dpid: 0,
        kid: 0,
        type: 'group',
    }

    const result: IQueryGroupListApiResult | null = await getGroupListApi(params)
    if (!result) {
        return []
    }

    totalPage = result.groups.lastPage
    groupQueryResultList = result.groups.groups.data
    
    if (syncProgressCallBack) {
        syncProgressCallBack(1, totalPage)
    }

    for (let i = 2; i <= totalPage; i++) {

        await delay(10)
        params.page = i

        if (syncProgressCallBack) {
            syncProgressCallBack(i, totalPage)
        }

        const result: IQueryGroupListApiResult | null = await getGroupListApi(params)
        if (!result) {
            return groupQueryResultList
        }
        
        groupQueryResultList = groupQueryResultList.concat(result.groups.groups.data)
    }

    return groupQueryResultList
}

export const getAllGroupsFromLocal = (): ILocalStorageObject<IGroup[]> | null => {
    return getLocal('groupList')
}

export const getAllGroups = async(forceUpdate: boolean = false, syncProgressCallBack?: (currentStep: number, totalStep: number) => void): Promise<IGroupInStorage> => {
    let allGroups: IGroupInStorage
    const localGroupList = getAllGroupsFromLocal()

    if (localGroupList && !forceUpdate) {
        allGroups = {
            groupList: localGroupList.data,
            updateAt: localGroupList.updatedAt
        }
    } else {
        const remoteGroupList = await getAllGroupsFromRemote(syncProgressCallBack)
        setLocal('groupList', remoteGroupList)
        allGroups = {
            groupList: remoteGroupList,
            updateAt: new Date().getTime()
        }
    }

    // 當資料為物件時，DataTable匯出資料會匯出成 object[object]，所以需要加上 kol_name
    allGroups.groupList.forEach((group) => {
        group.kol_name = group.kol?.kol_name || ''
    })

    return allGroups
}

export const statisticsGroup = (groupData: IGroup[], productData: IProduct[]): IGroupStatistics[] => {

    const productDict: {[key: string]: IGroupStatistics} = {}

    const groupStartDateList = groupData.map((group) => group.startDate || '')
    const groupUniqueYearMonths = getUniqueYearMonths(groupStartDateList)
    const yearMonthsObject = groupUniqueYearMonths.reduce((acc: { [key: string]: number }, value) => {
        acc[value] = 0
        return acc;
    }, {});

    groupData.forEach((group) => {
        const productInfo: IProduct | undefined = productData.find((product) => product.dpid === group.dpid)

        if (productInfo 
            && productInfo.dpid
            && productInfo.prod) {
            
            if (!(productInfo.dpid in productDict)) {
                productDict[productInfo.dpid] = {
                    dp_id: productInfo.dpid,
                    product_name: productInfo.prod,
                    vendor_id: productInfo.vendor?.vid || null,
                    vendor_name: productInfo.vendor?.vendorName || null,
                    create_group_count_by_the_month: 0,
                    create_group_count_by_total: 0,
                    revenue_sum: 0,
                    order_count: 0,
                    ...yearMonthsObject
                }
            }

            const product = productDict[productInfo.dpid]
            if (product) {
                
                product.create_group_count_by_total += 1

                if (group.created_at && isCurrentMonth(group.created_at)) {
                    product.create_group_count_by_the_month += 1
                }

                if (group.startDate) {
                    const yearMonth = getUniqueYearMonths([group.startDate])[0]
                    product[yearMonth] += 1

                    if (group.revenue) {
                        product.revenue_sum += group.revenue
                    }
                }

                if (group.orderNum) {
                    product.order_count += group.orderNum
                }

            }
        }
    })

    return Object.values(productDict)
}
