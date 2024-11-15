import axios from 'axios'
import { IResponseData } from './axios.d'
import { ResultEnum, RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import { routerTurnByName, showMessage } from '@/utils'
import { MessageEnum } from '@/enums/messageEnum'

const baseURL = import.meta.env.DEV ? import.meta.env.VITE_DEV_API_URL : import.meta.env.VITE_PROD_API_URL

const axiosInstance = axios.create({
    baseURL: `${baseURL}api/`,
    timeout: 120000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }, 
    withCredentials: true,
}) 

// 加入一個回應攔截器
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error
      if (response.status === ResultEnum.CSRF_ERROR || response.status === ResultEnum.UNAUTHORIZED) {
          showMessage(MessageEnum.ERROR, '授權失敗，請重新登入!');
          routerTurnByName(PageEnum.LOGIN_NAME);
      }
      return Promise.reject(error);
    }
)

const api = <T>(method: RequestEnum, contentType: ContentTypeEnum, url: string, query: any): Promise<IResponseData<T>> => {
    return axiosInstance({
      method,
      url,
      data: query,
      headers: {
        'Content-Type': contentType
      },
    })
  }

export { api }