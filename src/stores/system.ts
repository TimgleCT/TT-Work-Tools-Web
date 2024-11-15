import { defineStore } from 'pinia'

interface SystemState {
  loginStatus: boolean
}

export const useSystemStore = defineStore('useSystemStore', {
  state: (): SystemState => ({
    loginStatus: false,
  }),
  getters: {
    getLoginStatus(): boolean {
      return this.loginStatus
    }
  },
  actions: {
    setLoginStatus(status: boolean) {
      this.loginStatus = status
    }
  },
})