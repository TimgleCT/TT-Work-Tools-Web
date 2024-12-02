<template>
    <n-modal
        :show="showModal"
        preset="card"
        :style="bodyStyle"
        :title="title"
        size="small"
        :bordered="false"
        :segmented="{
            content: segmentTitle,
        }"
        @update:show="closeModal"
    >
        <slot></slot>
        <template #action>
            <n-space justify="end">
                <n-button 
                    v-for="btn in actionBtnList"
                    @click="btn.action"
                    :key="btn.label"
                    :type="btn.type"
                    :color="btn.color"
                    >
                    <template #icon>
                        <n-icon v-if="btn.icon">
                            <component
                                :is="btn.icon"
                            ></component>
                        </n-icon>
                    </template>
                    {{ btn.label }}
                </n-button>
            </n-space>
        </template>
    </n-modal>
</template>
  
  <script setup lang="ts">
  import { PropType } from 'vue'
  import { ICssStyle, IModalActionBtn } from './index.d'
  
  const props = defineProps({
      showModal: Boolean,
      title: String,
      segmentTitle: Boolean,
      bodyStyle: Object as PropType<ICssStyle>,
      actionBtnList: Array<IModalActionBtn>
  })

  const emit = defineEmits(['closeModal'])

  const closeModal = () => {
    if (props.showModal) {
      emit('closeModal')
    }
  }
  
  </script>
  <style lang="css" scoped>
  </style>