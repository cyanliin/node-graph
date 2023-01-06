<script setup lang="ts">
import type { Node } from '@/NodeCore/Node';

const props = defineProps<{
 node: Node
}>();

const emit = defineEmits<{
  (e: 'mousedown', node: Node, event: any): void
  (e: 'mouseup', node: Node, event: any): void
}>()

const onMouseDown = (event: any) => {
  emit('mousedown', props.node, event);
}

const onMouseUp = (event: any) => {
  emit('mouseup', props.node, event);
}
</script>
<template>
  <div
    class="node-ui compute-node"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    :style="{left: node.position.x + 'px', top: node.position.y + 'px', width: node.width + 'px'}"
  >
    <div class="node-type-name">{{ node.getType() }}</div>
  </div>
</template>
<style lang="scss">
.node-ui.compute-node {

  &:hover {
    background-color: red;
  }
}
</style>