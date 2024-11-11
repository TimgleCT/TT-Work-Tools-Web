<template>
  <n-icon size="128" :component="AnimalDog20Regular" />
  <div class="login-container">
    <n-form @submit.prevent="handleLogin">
      <n-form-item label="帳號">
        <n-input v-model:value="username" placeholder="請輸入帳號"/>
      </n-form-item>
      <n-form-item label="密碼">
        <n-input v-model:value="password" type="password" placeholder="請輸入密碼"/>
      </n-form-item>
      <n-button class="w-100" type="primary" @click="handleLogin" :loading="loading">登入</n-button>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { login } from '@/service/SystemService'
import { useSystemStore } from '@/stores/system'
import { routerTurnByName } from '@/utils'
import { PageEnum } from '@/enums/pageEnum'
import { AnimalDog20Regular } from '@vicons/fluent'

const systemStore = useSystemStore()

const username = ref<string>('')
const password = ref<string>('')
const loading = ref<boolean>(false)

const handleLogin = async () => {
  loading.value = true
  const loginResult = await login(username.value, password.value)
  if (loginResult) {
    systemStore.setLoginStatus(true)
    systemStore.setLoginUser(username.value)
    systemStore.setLoginDateTime(new Date())
    routerTurnByName(PageEnum.GROUP_NAME)
  }
  loading.value = false
}
</script>
<style lang="css" scoped>
.login-container {
  padding: 2.0rem;
  border: 2px solid #ccc;
  border-radius: 0.5rem;
  width: 350px;
}

</style>