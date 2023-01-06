<script setup lang="ts">
import { computed } from 'vue';
import type { ComputeNode } from '@/NodeCore/MathNodes';

const props = defineProps<{
 node: ComputeNode
}>();
const sign = computed((): string => {
  switch (props.node.type) {
    case 'Add': return '+';
    case 'Multiply': return '*';
    case 'Subtract': return '-';
    case 'Divide': return '/';
    default: return "?";
  }
})
</script>

<template>
  <div class="node-field compute">
    {{ sign }}
  </div>
</template>

<style lang="scss">
.node-field.compute {
  font-size: 18pt;
  line-height: 40px;
  padding: 0;
}
</style>