<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import type { Component } from 'vue';
import type { Node, NodeInputInfo } from '@/NodeCore/Node';

export interface PreviewTypeMap {
  [key: string]: Component
}

const previewTypeMap: PreviewTypeMap = {
  NumberNode: defineAsyncComponent(() => import('@/components/NodeUI/Preview/Number.vue')),
  ComputeNode: defineAsyncComponent(() => import('@/components/NodeUI/Preview/Compute.vue')),
};

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
    class="node-ui"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    :style="{
      left: node.position.x + 'px',
      top: node.position.y + 'px',
      width: node.width + 'px'
    }"
  >
    <div class="node-body">
      <div class="node-type-name">{{ node.getType() }}</div>
      <div class="node-preview-view">
        <component
          :is="previewTypeMap[node.constructor.name]"
          :node="node">
        </component>
      </div>
    </div>
    <div
      class="conn-point output"
      :style="{
        left: (node.outputPoint.x - 4) + 'px',
        top: (node.outputPoint.y - 4) + 'px'
      }"
    />
    <div
      v-for="input in inputLint"
      class="conn-point input"
      :class="{ hasConnect: input.node }"
      :style="{
        left: (input.offset.x - 4) + 'px',
        top: (input.offset.y - 4) + 'px'
      }"
    />
  </div>
</template>

<style lang="scss">
.node-ui {
  position: absolute;
  &:hover {
    >.node-body {
      background-color: #3c3c3c;
      border: 1px solid #aaa;

      .node-type-name {
        color: #fff;
      }
    }
  }

  >.node-body {
    background-color: #222;
    border: 1px solid #888;
    font-size: 8pt;
    color: #fff;
    border-radius: 8px;
    transition: border 0.1s;
    overflow: hidden;

    .node-type-name {
      font-size: 8pt;
      height: 22px;
      line-height: 22px;
      text-align: center;
      white-space: nowrap;
      color: #bbb;
      overflow: hidden;
    }

    .node-preview-view {
      // border-top: 1px solid #000;
      overflow: hidden;
    }

    .node-field {
      background-color: #222;
      padding: 4px;
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  }

  .conn-point {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #111;
    border: 1px solid tomato;

    &.hasConnect {
      background-color: tomato;
      border-color: #111;
    }

    &.output {
      background-color: tomato;
      border: 1px solid #111;
    }
  }
}
</style>