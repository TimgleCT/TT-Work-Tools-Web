<template>
    <modal
      title='團購統計設定'
      :segment-title="true"
      @close-modal="closeSettingsModal"
      :show-modal="showModal"
      :style="{ width: '500px' }"
      :action-btn-list="settingModalActionBtnList"
    >
      <n-grid :cols="4">
        <n-grid-item span="2">
          <div class="settingItem">顯示欄位</div>
        </n-grid-item>
        <n-grid-item span="2">
          <n-space vertical>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.product_name">產品名稱</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.vendor_name">品牌名稱</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.create_group_count_by_the_month">本月已排定開團數</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.revenue_sum">營收</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.order_count">訂單數</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.create_group_count_by_month">期間內每月開團數</n-checkbox>
            <n-checkbox v-model:checked="groupStatisticShowColumnsSettings.create_group_count_by_total">期間內總開團數</n-checkbox>
          </n-space>
        </n-grid-item>
      </n-grid>
    </modal>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { Modal } from '@/components/Modal'
import { IModalActionBtn } from '@/components/Modal/index.d'
import { ButtonTypeEnum } from '@/enums/styleEnum'
import { IGroupStatisticsShowColumnsSettings } from '../../index.d'
import { useGroupDataFormStore } from '@/stores/groupDataForm'
import { GroupStatisticsColumnsEnum } from '@/enums/groupEnum'

const groupDataFormStore = useGroupDataFormStore()

const props = defineProps({
    showModal: {
        type: Boolean,
        default: false
    }
})

const groupStatisticShowColumnsSettings = ref<IGroupStatisticsShowColumnsSettings>({
  [GroupStatisticsColumnsEnum.PRODUCT_NAME]: true,
  [GroupStatisticsColumnsEnum.VENDOR_NAME]: true,
  [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_THE_MONTH]: true,
  [GroupStatisticsColumnsEnum.REVENUE_SUM]: true,
  [GroupStatisticsColumnsEnum.ORDER_COUNT]: true,
  [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_MONTH]: true,
  [GroupStatisticsColumnsEnum.CREATE_GROUP_COUNT_BY_TOTAL]: true,
})

const emits = defineEmits(['closeModal'])
const closeSettingsModal = () => {
  emits('closeModal')
}
const saveSetting = () => {
  groupDataFormStore.setStatisticShowColumns(groupStatisticShowColumnsSettings.value)
}

const settingModalActionBtnList: IModalActionBtn[] = [
  {
    label: '關閉',
    action: closeSettingsModal
  },
  {
    label: '確定',
    action: () => {
      saveSetting()
      closeSettingsModal()
    },
    type: ButtonTypeEnum.PRIMARY
  }
]

watch(() => groupDataFormStore.getStatisticShowColumns, () => {
  groupStatisticShowColumnsSettings.value = JSON.parse(JSON.stringify(groupDataFormStore.getStatisticShowColumns))
}, {
  immediate: true
})

</script>
<style scoped>
.settingItem {
  font-weight: bold;
}

</style>