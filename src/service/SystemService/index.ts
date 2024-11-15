import { loginApi } from '@/api/path/system.api'
import { ILoginApi, ILoginApiResult } from '@/api/path/system.api.d'
import { showMessage } from '@/utils'
import { MessageEnum } from '@/enums/messageEnum'
import { useSystemStore } from '@/stores/system'

export const login = async(account: string, password: string): Promise<boolean> => {
   const param: ILoginApi = { account, password }
   const loginResult: ILoginApiResult | null = await loginApi(param)
   if (loginResult) {
        if (loginResult.icon === 'success') {
            const systemStore = useSystemStore()
            systemStore.setLoginStatus(true)
            showMessage(MessageEnum.SUCCESS, '登入成功')
            return true
        } else {
            showMessage(MessageEnum.WARNING, '帳號或密碼錯誤')
            return false
        }    
   }
   return false
}