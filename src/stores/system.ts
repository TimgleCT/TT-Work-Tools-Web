import { defineStore } from 'pinia'

interface SystemState {
  loginStatus: boolean,
  loginUser: string,
  loginDateTime: Date
}

export const useSystemStore = defineStore('useSystemStore', {
  state: (): SystemState => ({
    loginStatus: false,
    loginUser: '',
    loginDateTime: new Date(0)
  }),
  getters: {
    getLoginStatus(): boolean {
      return this.loginStatus
    },
    getLoginUser(): string {
      return this.loginUser
    },
    getLoginDateTime(): Date {
      return this.loginDateTime
    },
  },
  actions: {
    setLoginStatus(status: boolean) {
      this.loginStatus = status
    },
    setLoginUser(user: string) {
      this.loginUser = user
    },
    setLoginDateTime(date: Date) {
      this.loginDateTime = date
    },
  },
})