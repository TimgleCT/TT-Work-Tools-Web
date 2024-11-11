import axios from 'axios'
import { IResponseData } from './axios.d'
import { ResultEnum, RequestEnum, ContentTypeEnum } from '@/enums/httpEnum'
import { PageEnum } from '@/enums/pageEnum'
import { routerTurnByName } from '@/utils'

const baseURL = 'http://localhost:3000/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 120000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }, 
}) 

// 加入一個回應攔截器
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === ResultEnum.CSRF_ERROR) {
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