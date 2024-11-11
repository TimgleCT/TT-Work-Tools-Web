<template>
  <n-space vertical>
    <query-form></query-form>
    <div>
        <Tabs :components="components" size="large"></Tabs>
    </div>
    <group-footer></group-footer>
  </n-space>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { Tabs } from '@/components/Tabs'
import { ITab } from '@/components/Tabs/index.d'
import { GroupList } from './List'
import { QueryForm } from './QueryForm'
import { Statistics } from './Statistics'
import { GroupFooter } from './GroupFooter'

const components = shallowRef<ITab[]>([
  {
    name: 'groups',
    title: '團購列表',
    component: GroupList
  },
  {
    name: 'statistics',
    title: '團購統計',
    component: Statistics
  }
])

</script>

<style scoped>
</style>
  