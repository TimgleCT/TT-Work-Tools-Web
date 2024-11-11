import { ILocalStorageObject } from './index.d'

export const getLocal = (key: string) => {
    const target = localStorage.getItem(key)
    return (target) ? JSON.parse(target) : null
}

export const setLocal = (key: string, data: any) => {
    const localStorageObject: ILocalStorageObject<typeof data> = {
        data,
        updatedAt: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(localStorageObject))
}