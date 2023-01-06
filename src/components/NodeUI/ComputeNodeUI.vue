<script setup lang="ts">
import { computed } from 'vue';
import type { Node, NodeInputInfo } from '@/NodeCore/Node';
import type { ComputeNode } from '@/NodeCore/MathNodes';
import { ConnPointAlignment } from '@/NodeCore/Utility';
import ConnPoint from './ConnPoint.vue';

const props = defineProps<{
 node: ComputeNode
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
    class="node-ui math-compute"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    :style="{
      left: node.position.x + 'px',
      top: node.position.y + 'px',
      width: node.width + 'px'
    }"
  >
    <div class="node-body">
      <div class="sign" v-if="node.type === 'Add'">+</div>
      <div class="sign" v-if="node.type === 'Substract'">-</div>
      <div class="sign" v-if="node.type === 'Multiply'">*</div>
      <div class="sign" v-if="node.type === 'Divide'">/</div>
    </div>
    <ConnPoint :position="node.outputPoint" />
    <ConnPoint
      v-for="input in inputLint"
      :position="input.offset"
    />
  </div>
</template>

<style lang="scss">
.node-ui.math-compute {
  .node-body {
    height: 50px;

    .sign {
      margin: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 15pt;
      font-weight: bold;
      text-align: center;
    }
  }
}
</style>