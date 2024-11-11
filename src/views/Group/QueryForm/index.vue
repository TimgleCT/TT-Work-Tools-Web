<template>
    <div class="form">
        <n-grid x-gap="12" :cols="12">
        <n-gi span="2">
            <n-select :value="queryType" @update:value="updateQueryType" :options="queryTypeOptions" />
        </n-gi>
        <n-gi span="4">
            <n-date-picker :value="queryStartDate" @update:value="updateQueryStartDate" type="date"/>
        </n-gi>
        <n-gi span="4">
            <n-date-picker :value="queryEndDate" @update:value="updateQueryEndDate" type="date"/>
        </n-gi>
        <n-gi span="2">
            <n-button type="primary" @click="getGroupsAndProducts">查詢 & 統計</n-button>
        </n-gi>
        </n-grid>
    </div>
</template>
  
<script setup lang="ts">

import { computed } from 'vue'
import { useGroupDataFormStore } from '@/stores/groupDataFormState'
import { getAllProducts } from '@/service/ProductsService'
import { getGroupsByQuery } from '@/service/GroupsService'
import { QueryGroupTypeEnum } from '@/enums/groupEnum'
import { MessageEnum } from '@/enums/messageEnum'
import { showMessage } from '@/utils'

const groupDataFormStore = useGroupDataFormStore()


const queryType = computed(() => groupDataFormStore.getQueryType)
const queryTypeOptions = [
  {
    label: '建立日期',
    value: QueryGroupTypeEnum.BY_CREATE_DATE
  },
  {
    label: '開團起始日',
    value: QueryGroupTypeEnum.BY_START_DATE
  }
]
const queryStartDate = computed(() => groupDataFormStore.getQueryStartDate)
const queryEndDate = computed(() => groupDataFormStore.getQueryEndDate)

const updateQueryType = (type: QueryGroupTypeEnum) => {
    groupDataFormStore.setQueryType(type)
}

const updateQueryStartDate = (timestamp: number) => {
    groupDataFormStore.setQueryStartDate(timestamp)
}

const updateQueryEndDate = (timestamp: number) => {
    groupDataFormStore.setQueryEndDate(timestamp)
}

const getGroupsData = async () => {
    groupDataFormStore.setGroupList(await getGroupsByQuery(queryType.value, new Date(queryStartDate.value), new Date(queryEndDate.value)))
}

const getAllProductsData = async () => {
    groupDataFormStore.setProductList(await getAllProducts())
}

const isValidDateRange = () => {
    const startDate = new Date(queryStartDate.value)
    const endDate = new Date(queryEndDate.value)
    return startDate <= endDate
}
const getGroupsAndProducts = async () => {
    if (!isValidDateRange()) {
        showMessage(MessageEnum.ERROR, '日期範圍錯誤，請重新選擇')
        return
    }
    groupDataFormStore.setIsLoading(true)
    await getAllProductsData()
    await getGroupsData()
    groupDataFormStore.setIsLoading(false)
}

const init = async () => {
  await getGroupsAndProducts()
}

init()

</script>

<style scoped>
.form {
  padding: 1.0rem 0;
}
.form .label {
  font-size: 1.0rem;
  font-weight: bold;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  