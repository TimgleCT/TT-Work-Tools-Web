import { IProduct } from '@/views/Group/List/index.d'

export interface IProductInStorage {
    productList: IProduct[],
    updateAt: number
}