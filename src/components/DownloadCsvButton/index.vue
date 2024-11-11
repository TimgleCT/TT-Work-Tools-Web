<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button type="info" secondary icon-placement="right" @click="downloadFunction">
        <template #icon>
          <n-icon>
            <download-outline />
          </n-icon>
        </template>
        <span class="buttonText">下載</span>
      </n-button>
    </template>
    <div class="tooltip">
      <n-space vertical>
        <div class="tooltipHeader">
          <div class="title">CSV 下載中文亂碼處理步驟</div>
          <div class="subtitle">若直接以 Excel 開啟，會因編碼問題中文會出現亂碼，因此下載後需要轉換編碼方式</div>
        </div>
        <n-steps vertical size="small" >
            <n-step title="下載 CSV 檔" />
            <n-step title="以記事本開啟 CSV" />
            <n-step title="另存新檔，編碼方式選擇 '使用 BOM 的 UTF-8'"  />
            <n-step title="以 Excel 開啟新建立的 CSV 檔案" />
        </n-steps>
      </n-space>
    </div>
  </n-tooltip>
</template>

<script setup lang="ts">
import { DownloadOutline } from '@vicons/ionicons5'

const props = defineProps({
  downloadFunction: {
    type: Function,
    default: () => {}
  }
})

</script>
<style lang="css" scoped>
.buttonText {
  font-weight: bold;
}
.tooltip {
  padding: 0.5rem;
  width: 350px;
}
.title {
  font-size: 1.0rem;
  font-weight: bold;
}
.subtitle {
  font-size: 0.8rem;
  margin: 0.5rem 0;
  color: rgb(187, 187, 187);
}
</style>