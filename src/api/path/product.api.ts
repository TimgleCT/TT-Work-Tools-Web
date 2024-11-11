import { api } from '@/api/axios'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { IQueryProductListApi, IQueryProductListApiResult } from './product.api.d'
import { showMessage } from '@/utils'
import { MessageEnum } from '@/enums/messageEnum'

// 取得列表 API
export const getProductListApi = async (req: IQueryProductListApi): Promise<IQueryProductListApiResult | null> => {
    try {
        const result = await api<IQueryProductListApiResult>(RequestEnum.POST, ContentTypeEnum.FORM, '/prod/getProds', req)
        return result.data
    } catch (error) {
        showMessage(MessageEnum.ERROR, '取得產品列表失敗')
        return null
    }
}