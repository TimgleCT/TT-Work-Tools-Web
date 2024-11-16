<template>
  <n-tabs type="segment" animated>
    <n-tab-pane v-for="component in components" :key="component.name" :name="component.name" :tab="component.title" display-directive="show">
      <component
        :is="component.component"
        v-on="component.emitHandlers"
      ></component>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ITab } from './index.d'

const props = defineProps({
    components: Array<ITab>,
})

</script>
<style lang="css" scoped>
</style>