import { api } from '@/api/axios'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { IQueryGroupListApi, IQueryGroupListApiResult } from './group.api.d'
import { showMessage } from '@/utils'
import { MessageEnum } from '@/enums/messageEnum'

// 取得團購列表 API
export const getGroupListApi = async (req: IQueryGroupListApi): Promise<IQueryGroupListApiResult | null> => {
    try {
        const result = await api<IQueryGroupListApiResult>(RequestEnum.POST, ContentTypeEnum.FORM, '/group/getGroups', req)
        return result.data
    } catch (error) {
        showMessage(MessageEnum.ERROR, '取得團購列表失敗')
        return null
    }
}