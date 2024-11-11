import { IProduct } from '@/views/Group/List/index.d'
import { getProductListApi } from '@/api/path/product.api'
import { IQueryProductListApi, IQueryProductListApiResult } from '@/api/path/product.api.d'
import { setLocal, getLocal } from '@/service/LocalStorageService'
import { ILocalStorageObject } from '@/service/LocalStorageService/index.d'
import { IProductInStorage } from './index.d'
import { delay } from '@/utils'

export const getAllProductsFromRemote = async(syncProgressCallBack?: (currentStep: number, totalStep: number) => void): Promise<IProduct[]> => {
    let totalPage = 1
    let productList: IProduct[] = []
    let params: IQueryProductListApi = {
        page: 1,
        keyword: '',
        eyid: 0,
        sort: 'created_at',
        sort_by: 'desc',
        dpid: 0,
        kid: 0,
    }

    const result: IQueryProductListApiResult | null = await getProductListApi(params)
    if (!result) {
        return []
    }

    productList = result.prods.prods.data
    totalPage = result.prods.lastPage

    if (syncProgressCallBack) {
        syncProgressCallBack(1, totalPage)
    }

    for (let i = 2; i <= totalPage; i++) {

        await delay(3)
        params.page = i

        if (syncProgressCallBack) {
            syncProgressCallBack(i, totalPage)
        }

        const result: IQueryProductListApiResult | null = await getProductListApi(params)
        if (!result) {
            return productList
        }
        productList = productList.concat(result.prods.prods.data)
    }

    return productList
}

export const getAllProductsFromLocal = (): ILocalStorageObject<IProduct[]> | null => {
    return getLocal('productList')
}

export const getAllProducts = async(forceUpdate: boolean = false, syncProgressCallBack?: (currentStep: number, totalStep: number) => void): Promise<IProductInStorage> => {
    const localProductList = getAllProductsFromLocal()
    if (localProductList && !forceUpdate) {
        return {
            productList: localProductList.data,
            updateAt: localProductList.updatedAt
        }
    } else {
        const remoteProductList = await getAllProductsFromRemote(syncProgressCallBack)
        setLocal('productList', remoteProductList)
        return {
            productList: remoteProductList,
            updateAt: new Date().getTime()
        }
    }
}