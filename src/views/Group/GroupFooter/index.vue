<template>
    <n-divider />
    <div class="footer">
      <n-space vertical>
        <n-space class="label">
            <span>開團資料更新時間： {{ timestampToDateString(groups.updateAt, 'YYYY-MM-DD HH:mm:ss') }}</span>
            <n-popconfirm
                @positive-click="confirmUpdateGroups"
                negative-text="取消"
                positive-text="確認更新"
            >
                <template #trigger>
                    <n-icon size="16" class="reload" :class="{ 'rotate': groupsForceLoading }">
                        <reload />
                    </n-icon>
                </template>
                更新開團資訊會需要較長時間!
            </n-popconfirm>
            <div class="progress">
                <n-progress
                    v-if="updateGroupsProgressPercentage > 0 && groupsForceLoading"
                    type="line"
                    :percentage="updateGroupsProgressPercentage"
                    :processing="updateGroupsProgressPercentage < 100"
                >
                    {{ updateGroupsProgressPercentage }}% ({{ currentUpdatedGroupsStep }}/{{ newGroupsCount }})
                </n-progress>
            </div>
        </n-space>
        <n-space class="label">
          <span>產品與供應商資料更新時間： {{ timestampToDateString(products.updateAt, 'YYYY-MM-DD HH:mm:ss') }}</span>
          <n-icon size="16" class="reload" :class="{ 'rotate': productsForceLoading }" @click="getAllProductsData">
            <reload />
          </n-icon>
          <div class="progress">
            <n-progress
                v-if="updateProductsProgressPercentage > 0 && productsForceLoading"
                type="line"
                :percentage="updateProductsProgressPercentage"
                :processing="updateProductsProgressPercentage < 100"
            >
                   {{ updateProductsProgressPercentage }}% ({{ currentUpdatedProductsStep }}/{{ newProductsCount }})
            </n-progress>
          </div>
        </n-space>
      </n-space>
    </div>
</template>
  
<script setup lang="ts">

import { ref, computed } from 'vue'
import { useGroupDataFormStore } from '@/stores/groupDataForm'
import { getAllProducts } from '@/service/ProductsService'
import { getAllGroups, getGroupsByQuery } from '@/service/GroupsService'
import {  timestampToDateString } from '@/utils'
import { Reload } from '@vicons/ionicons5'

const groupDataFormStore = useGroupDataFormStore()

const groups = computed(() => groupDataFormStore.getGroupList)
const products = computed(() => groupDataFormStore.getProductList)

const setNewQueryGroupResult = async () => {
  const newQueryResult = await getGroupsByQuery(groupDataFormStore.getQueryType, new Date(groupDataFormStore.getQueryStartDate), new Date(groupDataFormStore.getQueryEndDate))
  groupDataFormStore.setGroupList(newQueryResult)
}

const groupsForceLoading = ref(false)
const forceUpdateAllGroups = async () => {
  groupsForceLoading.value = true
  await getAllGroups(true, syncUpdateGroupsProgress)
  await setNewQueryGroupResult()
  groupsForceLoading.value = false

  newGroupsCount.value = 0
  currentUpdatedGroupsStep.value = 0
}

const confirmUpdateGroups = () => {
    forceUpdateAllGroups()
}

const newGroupsCount = ref(0)
const currentUpdatedGroupsStep = ref(0)
const updateGroupsProgressPercentage = computed(() => {
    return Math.floor((currentUpdatedGroupsStep.value / newGroupsCount.value) * 100)
})
const syncUpdateGroupsProgress = (currentStep: number, totalStep: number) => {
    newGroupsCount.value = totalStep
    currentUpdatedGroupsStep.value = currentStep
}

const productsForceLoading = ref(false)
const getAllProductsData = async () => {
    productsForceLoading.value = true
    groupDataFormStore.setProductList(await getAllProducts(true, syncUpdateProductsProgress))
    productsForceLoading.value = false

    newProductsCount.value = 0
    currentUpdatedProductsStep.value = 0
}

const newProductsCount = ref(0)
const currentUpdatedProductsStep = ref(0)
const updateProductsProgressPercentage = computed(() => {
    return Math.floor((currentUpdatedProductsStep.value / newProductsCount.value) * 100)
})
const syncUpdateProductsProgress = (currentStep: number, totalStep: number) => {
    newProductsCount.value = totalStep
    currentUpdatedProductsStep.value = currentStep
}

</script>

<style scoped>
.footer .label{
  color:rgb(161, 161, 161);
  font-size: 0.75rem;
  text-align: left;
}
.reload {
  cursor: pointer;
}
.rotate {
  animation: rotate 1s linear infinite;
}
.progress {
  width: 250px;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
  