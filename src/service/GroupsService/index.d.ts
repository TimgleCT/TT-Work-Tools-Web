import { IGroup } from '@/views/Group/List/index.d'

export interface IGroupInStorage {
    groupList: IGroup[],
    updateAt: number
}