<template>
    <n-space vertical>
        <div class="header">
            <n-space justify="space-between">
                <n-space align="center">
                    <div>團購統計</div>
                    <n-icon 
                      @click="openSettingsModal" 
                      class="align-center cursor-pointer">
                      <settings-outline></settings-outline>
                    </n-icon>
                </n-space>
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
                :row-props="goGroupListAndSetProductFilter"
            />
        </div>
    </n-space>

    <setting-modal
        :show-modal="showSettingsModal"
        @close-modal="closeSettingsModal"
    ></setting-modal>
</template>
  
<script setup lang="ts">

import { computed, ref } from 'vue'
import type { DataTableColumns, DataTableInst, DataTableColumn } from 'naive-ui'
import { useGroupDataFormStore } from '@/stores/groupDataForm'
import { statisticsGroup } from '@/service/GroupsService'
import { IGroupStatistics } from './index.d'
import { DownloadCsvButton } from '@/components/DownloadCsvButton'
import { isYearMonthString, sortDateStringList, addNumberComma, timestampToDateString } from '@/utils'
import { SettingsOutline } from '@vicons/ionicons5'
import { SettingModal } from './components/SettingModal'
import { GroupStatisticsColumnsEnum } from '@/enums/groupEnum'

const statisticalDataTableRef = ref<DataTableInst>()
const groupDataFormStore = useGroupDataFormStore()

const groups = computed(() => groupDataFormStore.getGroupList)
const products = computed(() => groupDataFormStore.getProductList)
const loading = computed(() => groupDataFormStore.getIsLoading)

const statistics = computed(() => {
  return statisticsGroup(groups.value.groupList, products.value.productList)
})

const staticStartColumns: { [key: string]: DataTableColumn<IGroupStatistics> } = {
  [GroupStatisticsColumnsEnum.PRODUCT_NAME]: {
      title: '產品名稱',
      key: GroupStatisticsColumnsEnum.PRODUCT_NAME,
      titleAlign: 'center',
      align: 'center',
      fixed: 'left',
      width: 160,
  },
  [GroupStatisticsColumnsEnum.VENDOR_NAME]: {
      title: '品牌名稱',
      key: GroupStatisticsColumnsEnum.VENDOR_NAME,
      titleAlign: 'center',
      align: 'center',
      fixed: 'left',
      width: 160,
  },
  [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_THE_MONTH]: {
      title: '本月已排定開團數',
      key: GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_THE_MONTH,
      titleAlign: 'center',
      width: 170,
      align: 'right',
      sorter: 'default'
  },
  [GroupStatisticsColumnsEnum.REVENUE_SUM]: {
      title: '營收',
      key: GroupStatisticsColumnsEnum.REVENUE_SUM,
      titleAlign: 'center',
      align: 'right',
      sorter: 'default',
      width: 120,
      render(row: IGroupStatistics) {
        return addNumberComma(row.revenue_sum || 0)
      },
  },
  [GroupStatisticsColumnsEnum.ORDER_COUNT]: {
      title: '訂單數',
      key: GroupStatisticsColumnsEnum.ORDER_COUNT,
      titleAlign: 'center',
      align: 'right',
      sorter: 'default',
      width: 120,
      render(row: IGroupStatistics) {
        return addNumberComma(row.order_count || 0)
      },
  }
}

const staticEndColumns: { [key: string]: DataTableColumn<IGroupStatistics> } = {
  [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_TOTAL]: {
      title: '期間內總開團數',
      key: GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_TOTAL,
      className: 'total-group',
      width: 160,
      titleAlign: 'center',
      align: 'right',
      sorter: 'default'
  }
}

const statisticalColumns = computed<DataTableColumns<IGroupStatistics>>(() => {
  const resultColumns: DataTableColumns<IGroupStatistics> = []
  const showColumnsSettings = groupDataFormStore.getStatisticShowColumns
  const staticStartColumnsKeys = Object.keys(staticStartColumns) as GroupStatisticsColumnsEnum[]
  const staticEndColumnsKeys = Object.keys(staticEndColumns) as GroupStatisticsColumnsEnum[]

  staticStartColumnsKeys.forEach(key => {
    if (showColumnsSettings[key]) {
      resultColumns.push(staticStartColumns[key])
    }
  })

  if (statistics.value.length !== 0 && showColumnsSettings[GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_MONTH]) {
    const statisticsKeys = Object.keys(statistics.value[0])
    const yearMonthKeys = sortDateStringList(statisticsKeys.filter(key => isYearMonthString(key)), 'desc')
    yearMonthKeys.forEach(key => {
      resultColumns.push({
        title: `${key} 開團數`,
        key: key,
        titleAlign: 'center',
        align: 'right',
        sorter: 'default'
      })
    })
  }

  staticEndColumnsKeys.forEach(key => {
    if (showColumnsSettings[key]) {
      resultColumns.push(staticEndColumns[key])
    }
  })

  return resultColumns
})

const statisticalColumnsXWidth = computed(() => {
  const baseWidth = statisticalColumns.value.reduce((total, column) => total + ((typeof column.width === 'number' ? column.width : 0)), 0)
  if (statistics.value.length === 0 || !groupDataFormStore.getStatisticShowColumns[GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_MONTH]) {
    return baseWidth
  }
  const statisticsKeys = Object.keys(statistics.value[0])
  const yearMonthKeys = statisticsKeys.filter(key => isYearMonthString(key))
  return baseWidth + yearMonthKeys.length * 160
})

const exportSorterAndFilterCsv = () => {
  statisticalDataTableRef.value?.downloadCsv({
    fileName: `${timestampToDateString(groupDataFormStore.getQueryStartDate, 'YYYY-MM-DD')}_${timestampToDateString(groupDataFormStore.getQueryEndDate, 'YYYY-MM-DD')}_group_statistical.csv`,
    keepOriginalData: false,
  })
}


const emits = defineEmits(['goGroupListAndSetProductFilter'])
const goGroupListAndSetProductFilter = (row: IGroupStatistics) => {
  return {
    style: {
      cursor: 'pointer'
    },
    onClick: () => {
      groupDataFormStore.setFilterProduct(row.product_name)
      emits('goGroupListAndSetProductFilter')
    }
  }
}

const showSettingsModal = ref(false)
const openSettingsModal = () => {
  showSettingsModal.value = true
}
const closeSettingsModal = () => {
  showSettingsModal.value = false
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

:deep(.total-group) {
  background: #26262a !important;
}

</style>
  