<template>
  <n-tabs type="segment" animated>
    <n-tab-pane v-for="component in components" :name="component.name" :tab="component.title">
      <component
        :is="component.component"
      ></component>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ITab } from './index.d'

const props = defineProps({
  components: Array<ITab>
})

</script>
<style lang="css" scoped>
</style>