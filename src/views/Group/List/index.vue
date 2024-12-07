<template>
  <n-space vertical>
    <div class="header">
      <n-space justify="space-between">
        <div>
          開團列表
          <span class="count">({{ groups.groupList.length }}團)</span>
        </div>
        <download-csv-button :download-function="exportSorterAndFilterCsv" />
      </n-space>
    </div>
    <div class="content">
      <n-data-table
        ref="groupDataTableRef"
        :columns="rawDataColumns"
        :data="groups.groupList"
        :bordered="false"
        :loading="loading"
        :max-height="500"
        :min-height="500"
        @update:filters="handleUpdateFilter"
      />
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { IGroup } from './index.d'
import type { DataTableColumns, DataTableInst, DataTableBaseColumn, DataTableFilterState } from 'naive-ui'
import {  timestampToDateString, getUniqueObjArrayByProperty, addNumberComma } from '@/utils'
import { QueryGroupTypeEnum } from '@/enums/groupEnum'
import { useGroupDataFormStore } from '@/stores/groupDataForm'
import { DownloadCsvButton } from '@/components/DownloadCsvButton'

const groupDataTableRef = ref<DataTableInst>()

const groupDataFormStore = useGroupDataFormStore()

const groups = computed(() => groupDataFormStore.getGroupList)
const loading = computed(() => groupDataFormStore.getIsLoading)

const productColumnFilterValue = ref<null | string>(null)
const productColumnKey = 'prod'
const rawDataColumns = computed<DataTableColumns<IGroup>>(() => {
  const columns: DataTableColumns<IGroup> = [
    {
      title: 'No',
      key: 'No',
      render(row: IGroup, index: number) {
        return index + 1
      },
      width: 60
    },
    {
      title: '建立日期',
      key: 'created_at',
      sorter: (a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : Infinity;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : Infinity;
        return dateA - dateB;
      },
      render(row: IGroup) {
        return (row.created_at) ? timestampToDateString(new Date(row.created_at).getTime(), 'YYYY-MM-DD') : ''
      }
    },
    {
      title: '開團起始日',
      key: 'startDate',
      sorter: (a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : Infinity;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : Infinity;
        return dateA - dateB;
      }
    },
    {
      title: '開團結束日',
      key: 'endDate',
    },
    {
      title: '開團產品',
      key: productColumnKey,
      filterOptions: getUniqueObjArrayByProperty(groups.value.groupList
        .filter(group => group.prod)
        .map(group => ({
          label: group.prod || '',
          value: group.prod || ''
        })), 'value') || [],
      filter(value, row) {
        return row.prod === value
      },
      filterOptionValue: productColumnFilterValue.value
    },
    {
      title: 'KOL',
      key: 'kol_name',
      filterOptions: groups.value.groupList.map(group => ({
        label: group.kol.kol_name || '',
        value: group.kol.kid || ''
      })) || [],
      filter(value, row) {
        return row.kol.kid === value
      }
    }, 
    {
      title: 'PM',
      key: 'ey_name',
      filterOptions: getUniqueObjArrayByProperty(groups.value.groupList.map(group => ({
        label: group.ey_name || '',
        value: group.eyid || ''
      })), 'value') || [],
      filter(value, row) {
        return row.eyid === value
      }
    }, 
    {
      title: '訂單數',
      key: 'orderNum',
      sorter: 'default',
      render(row: IGroup) {
        return addNumberComma(row.orderNum || 0)
      },
    }, 
    {
      title: '銷售數',
      key: 'saleNum',
      sorter: 'default',
      render(row: IGroup) {
        return addNumberComma(row.saleNum || 0)
      },
    }, 
    {
      title: '營收',
      key: 'revenue',
      sorter: 'default',
      render(row: IGroup) {
        return addNumberComma(row.revenue || 0)
      },
    }
  ]

  if (groupDataFormStore.getQueryType === QueryGroupTypeEnum.BY_START_DATE) {
    const createDateColumn = columns.splice(1, 1)[0];
    columns.splice(3, 0, createDateColumn);
  } 

  return columns
})

const handleUpdateFilter = (filters: DataTableFilterState, sourceColumn: DataTableBaseColumn) => { 
  if (sourceColumn.key === productColumnKey) {
    productColumnFilterValue.value = filters[sourceColumn.key] as string
  }
}

watch(() => groupDataFormStore.getFilterProduct, () => {
  productColumnFilterValue.value = groupDataFormStore.getFilterProduct
})

const exportSorterAndFilterCsv = () => {
  groupDataTableRef.value?.downloadCsv({
    fileName: `${timestampToDateString(groupDataFormStore.getQueryStartDate, 'YYYY-MM-DD')}_${timestampToDateString(groupDataFormStore.getQueryEndDate, 'YYYY-MM-DD')}_group_raw.csv`,
    keepOriginalData: false,
  })
}

</script>
<style lang="css" scoped>
.header {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;  
}
.content {
  margin-bottom: 1.0rem;
}
.count {
  font-size: 1.0rem;
  font-weight: bold;
  color:gray;
}
</style>