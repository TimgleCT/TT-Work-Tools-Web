<template>
    <n-space vertical>
        <div class="header">
            <n-space justify="space-between">
                <div>團購統計</div>
                <download-csv-button :download-function="exportSorterAndFilterCsv" />
            </n-space>
        </div>
        <div class="content">
            <n-data-table
                ref="statisticalDataTableRef"
                class="mt-3"
                :columns="statisticalColumns"
                :data="statistics"
                :bordered="false"
                :loading="loading"
                :scroll-x="statisticalColumnsXWidth"
                :max-height="500"
                :min-height="500"
                striped
            />
        </div>
    </n-space>
</template>
  
<script setup lang="ts">

import { computed, ref } from 'vue'
import type { DataTableColumns, DataTableInst } from 'naive-ui'
import { useGroupDataFormStore } from '@/stores/groupDataForm'
import { statisticsGroup } from '@/service/GroupsService'
import { IGroupStatistics } from './index.d'
import { DownloadCsvButton } from '@/components/DownloadCsvButton'
import { isYearMonthString, sortDateStringList, addNumberComma, timestampToDateString } from '@/utils'

const statisticalDataTableRef = ref<DataTableInst>()
const groupDataFormStore = useGroupDataFormStore()

const groups = computed(() => groupDataFormStore.getGroupList)
const products = computed(() => groupDataFormStore.getProductList)
const loading = computed(() => groupDataFormStore.getIsLoading)

const statistics = computed(() => {
  return statisticsGroup(groups.value.groupList, products.value.productList)
})

const statisticalColumns = computed<DataTableColumns<IGroupStatistics>>(() => {
  const resultColumns: DataTableColumns<IGroupStatistics> = [
      {
        title: '產品名稱',
        key: 'product_name',
        align: 'center',
        fixed: 'left',
        width: 160,
      },
      {
        title: '品牌名稱',
        key: 'vendor_name',
        align: 'center',
        fixed: 'left',
        width: 160,
      },
      {
        title: '本月已排定開團數量',
        key: 'create_group_by_the_month',
        width: 170,
        align: 'center',
        sorter: 'default'
      },
      {
        title: '營收',
        key: 'revenue_sum',
        align: 'center',
        sorter: 'default',
        render(row: IGroupStatistics) {
          return addNumberComma(row.revenue_sum || 0)
        },
      },
      {
        title: '訂單數',
        key: 'order_count',
        align: 'center',
        sorter: 'default',
        render(row: IGroupStatistics) {
          return addNumberComma(row.order_count || 0)
        },
      }
  ]

  if (statistics.value.length === 0) {
    return resultColumns
  }

  const statisticsKeys = Object.keys(statistics.value[0])
  const yearMonthKeys = sortDateStringList(statisticsKeys.filter(key => isYearMonthString(key)), 'desc')
  yearMonthKeys.forEach(key => {
    resultColumns.push({
      title: `${key} 開團數量`,
      key: key,
      align: 'center',
      sorter: 'default'
    })
  })

  return resultColumns
})

const statisticalColumnsXWidth = computed(() => {
  const baseWidth = 800
  if (statistics.value.length === 0) {
    return baseWidth
  }
  const statisticsKeys = Object.keys(statistics.value[0])
  const yearMonthKeys = statisticsKeys.filter(key => isYearMonthString(key))
  return baseWidth + yearMonthKeys.length * 170
})

const exportSorterAndFilterCsv = () => {
  statisticalDataTableRef.value?.downloadCsv({
    fileName: `${timestampToDateString(groupDataFormStore.getQueryStartDate, 'YYYY-MM-DD')}_${timestampToDateString(groupDataFormStore.getQueryEndDate, 'YYYY-MM-DD')}_group_statistical.csv`,
    keepOriginalData: false,
  })
}

</script>

<style scoped>
.header {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;  
}
.content {
  margin-bottom: 1.0rem;
}
</style>
  