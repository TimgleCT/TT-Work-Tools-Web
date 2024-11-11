<template>
    <n-result
        status="404"
        title="404"
        description="抱歉，並無此頁面存在"
    >
        <template #footer>
        <n-button @click="goHome">返回首頁</n-button>
        </template>
    </n-result>
</template>

<script setup lang="ts">
import { goHome } from '@/utils'
</script>
<style lang="css" scoped>
</style>