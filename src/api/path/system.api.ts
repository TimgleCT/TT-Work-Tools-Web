import { api } from '@/api/axios'
import { RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { ILoginApi, ILoginApiResult } from './system.api.d'
import { showMessage } from '@/utils'
import { MessageEnum } from '@/enums/messageEnum'

// 登入 API
export const loginApi = async (req: ILoginApi): Promise<ILoginApiResult | null> => {
    try {
        const result = await api<ILoginApiResult>(RequestEnum.POST, ContentTypeEnum.FORM, '/loginApi', req)
        return result.data
    } catch (error) {
        showMessage(MessageEnum.ERROR, '登入失敗！請再試一次')
        return null
    }
}