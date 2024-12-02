import { ButtonTypeEnum } from '@/enums/styleEnum'
import type { Component } from 'vue'

export interface ICssStyle {
    [key: string]: string
}

export interface IModalActionBtn {
    label: string
    type?: ButtonTypeEnum
    color?: string
    icon? : Component
    action: () => void
}