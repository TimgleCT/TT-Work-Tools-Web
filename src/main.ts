import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupNaive } from '@/plugins/index'
import { createPinia } from 'pinia'
import { createRouterGuards, router } from '@/router'

const pinia = createPinia()

const app = createApp(App)

setupNaive(app)

app.use(pinia)

app.use(router)
  
createRouterGuards(router)

router.isReady().then(() => {
  app.mount('#app')
})
