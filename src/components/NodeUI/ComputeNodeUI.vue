<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { Node, NodeInputInfo } from '@/NodeCore/Node';
import type { ComputeNode } from '@/NodeCore/MathNodes';
import { ConnPointAlignment } from '@/NodeCore/Utility';
import ConnPoint from './ConnPoint.vue';

const props = defineProps<{
 node: ComputeNode
}>();

const sign:Ref<string> = ref(props.node.getOperator());

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

function onOperatorChange() :void {
  props.node.setOperator(sign.value);
}
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
      <select v-model="sign" @change="onOperatorChange">
        <option value="Add">Add</option>
        <option value="Substract">Substract</option>
        <option value="Multiply">Multiply</option>
        <option value="Divide">Divide</option>
      </select>
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
    width: 120px;
    height: 50px;
    display: flex;
    align-content: center;
    justify-content: center;
  }
}
</style>