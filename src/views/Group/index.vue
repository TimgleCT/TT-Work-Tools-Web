<template>
  <n-space vertical>
    <query-form></query-form>
    <div>
        <Tabs 
          :components="components" 
          v-model:value="selectTab" 
          size="large"></Tabs>
    </div>
    <group-footer></group-footer>
  </n-space>
</template>

<script setup lang="ts">
import { shallowRef, ref } from 'vue'
import { Tabs } from '@/components/Tabs'
import { ITab } from '@/components/Tabs/index.d'
import { GroupList } from './List'
import { QueryForm } from './QueryForm'
import { Statistics } from './Statistics'
import { GroupFooter } from './GroupFooter'

const selectTab = ref<'groups' | 'statistics'>('groups')

const components = shallowRef<ITab[]>([
  {
    name: 'groups',
    title: '團購列表',
    component: GroupList,
    emitHandlers: {}
  },
  {
    name: 'statistics',
    title: '團購統計',
    component: Statistics,
    emitHandlers: {
      goGroupListAndSetProductFilter: () => {
        selectTab.value = 'groups'
      }
    }
  }
])

</script>

<style scoped>
</style>
  