<script setup lang="ts">
import type { NumberNode } from '@/NodeCore/MathNodes';

const props = defineProps<{
 node: NumberNode
}>();
</script>

<template>
  <div class="node-field number">{{ node.value }}</div>
</template>

<style lang="scss">
.node-field.number {
  font-size: 9pt;
  line-height: 30px;
  padding: 0;
  height: 30px;
  white-space: nowrap;
  overflow: hidden;
}
</style>