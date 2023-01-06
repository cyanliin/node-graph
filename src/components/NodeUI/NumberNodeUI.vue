<script setup lang="ts">
import { computed } from 'vue';
import type { Node, NodeInputInfo } from '@/NodeCore/Node';
import type { NumberNode } from '@/NodeCore/MathNodes';
import ConnPoint from './ConnPoint.vue';

const props = defineProps<{
 node: NumberNode
}>();

// define emit list
const emit = defineEmits<{
  (e: 'mousedown', node: Node, event: any): void
  (e: 'mouseup', node: Node, event: any): void
}>()

// events
const onMouseDown = (event: any) => {
  emit('mousedown', props.node, event);
}

const onMouseUp = (event: any) => {
  emit('mouseup', props.node, event);
}

// setup input to list
const inputLint = computed((): NodeInputInfo[] => {
  const inList: NodeInputInfo[] = [];
  Object.keys(props.node.inputs).forEach((inKey) => {
    inList.push(props.node.inputs[inKey]);
  })
  return inList;
})
</script>

<template>
  <div
    class="node-ui math-number"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    :style="{
      left: node.position.x + 'px',
      top: node.position.y + 'px',
      width: node.width + 'px'
    }"
  >
    <div class="node-body">
      {{ node.value }}
    </div>
    <ConnPoint :position="node.outputPoint" />
  </div>
</template>

<style lang="scss">
.node-ui.math-number {

  >.node-body {
    font-size: 11pt;
    width: 90px;
    height: 30px;
    line-height: 30px;
    padding: 0 25px 0 10px;
    text-align: center;
    font-weight: bold;
  }
}
</style>