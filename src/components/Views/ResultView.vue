<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import type { Node } from '@/NodeCore/Node';

const props = defineProps<{
 node: Node
}>();

const outputContent = computed(() => {
  return props.node.getOutput();
})

</script>
<template>
    <div class="nd-view result-view">{{ outputContent }}</div>
</template>
<style lang="scss">
.nd-view.result-view {
    background-color: #000;
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
}
</style>