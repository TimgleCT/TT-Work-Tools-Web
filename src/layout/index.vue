<template>
    <router-view></router-view>
</template>
<script lang="ts" setup>
import { useMessage } from 'naive-ui'
window['$message'] = useMessage()
</script>