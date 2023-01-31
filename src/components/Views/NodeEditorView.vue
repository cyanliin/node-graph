<script setup lang="ts">
import { ref, computed, defineAsyncComponent } from 'vue';
import type { Ref, Component } from 'vue';
import type { Node, NodeConnection } from '@/NodeCore/Node';
import DataTable from '@/components/Hud/DataTable.vue';
import ConnLine from '@/components/ConnLine.vue';
import NodeUI from '@/components/NodeUI/NodeUI.vue';
import type { Vector2 } from '@/NodeCore/Utility';


// Define all node UI for dynamic components
export interface NodeTypeMap {
  [key: string]: Component
}
const nodeTypeMap: NodeTypeMap = {
  'math.number': defineAsyncComponent(() => import('@/components/NodeUI/NumberNodeUI.vue')),
  'math.compute': defineAsyncComponent(() => import('@/components/NodeUI/ComputeNodeUI.vue')),
};



const props = defineProps<{
 nodes: Node[]
}>();

const emit = defineEmits<{
  (e: 'select-node', node: Node): void
}>()


// Mouse Hud
const isDisplayMouseInfo: Ref<boolean> = ref(true);
const mousePosition: Ref<Vector2> = ref({x: 0, y: 0});
const canvasPosition: Ref<Vector2> = ref({x: 0, y: 0});
let isMouseDown: boolean = false;
let isDraggingCav: boolean = false;
let draggingCavOffset: Vector2 = {x: 0, y: 0};
let draggingCavStartPosition: Vector2 = {x: 0, y: 0};

const onMouseDown = (event: any) => {
  isMouseDown = true;
  draggingCavOffset = canvasPosition.value;
  draggingCavStartPosition = {x: event.clientX, y: event.clientY};
}

const onMouseUp = (event: any) => {
  draggingNode = null;
  isMouseDown = false;
  isDraggingCav = false;
}

const onMouseMove = (event: any) => {
  mousePosition.value = {x: event.clientX, y: event.clientY};

  if (draggingNode) {
    const x = dragginOffsert.x + (event.clientX - dragginStartPoint.x);
    const y = dragginOffsert.y + (event.clientY - dragginStartPoint.y);
    draggingNode.setPosition({x, y});
  }

  if (!draggingNode && isMouseDown) {
    canvasPosition.value = {
      x: draggingCavOffset.x + (event.clientX - draggingCavStartPosition.x),
      y: draggingCavOffset.y + (event.clientY - draggingCavStartPosition.y)
    }
    isDraggingCav = true;
  }
}


// Node Drag & Drop
let draggingNode: Node | null = null;
let dragginOffsert: Vector2 = {x: 0, y: 0};
let dragginStartPoint: Vector2 = {x: 0, y: 0};
const onNodeMouseDown = (node: Node, event: any) => {
  draggingNode = node;
  dragginOffsert = node.position;
  dragginStartPoint = {x: event.clientX, y: event.clientY};
  emit('select-node', node);
}

const mouseInfo = computed(() => {
  return [
    {
      label: 'canvasX',
      value: canvasPosition.value.x,
    },
    {
      label: 'canvasY',
      value: canvasPosition.value.y,
    },
    {
      label: 'mouseX',
      value: mousePosition.value.x,
    },
    {
      label: 'mouseY',
      value: mousePosition.value.y,
    },
  ]
})


// Connection Lines
const connLines = computed(():NodeConnection[] => {
  const lines: NodeConnection[] = [];
  props.nodes.forEach((node: Node) => {
    Object.keys(node.inputs).forEach((key) => {
      node.inputs[key].node.forEach((inNode) => {
        lines.push({
          from: inNode,
          to: node,
          key: key,
        })
      })
    })
  });
  return lines;
});
</script>

<template>
  <div
    class="nd-view node-editor-view"
    @mousedown="onMouseDown($event)"
    @mouseup="onMouseUp($event)"
    @mousemove="onMouseMove($event)"
  >

    <!-- HUD Layer -->
    <div class="nd-layer hud">
      <div v-if="isDisplayMouseInfo" class="mouse-info">
        <data-table :datas="mouseInfo"></data-table>
      </div>
    </div>

    <!-- Line Layer -->
    <div
      class="nd-layer lines"
      :style="{transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`}"
    >
      <svg style="width: 100%; height: 100%; overflow: visible;">
        <ConnLine
          v-for="line in connLines"
          :from="line.from"
          :to="line.to"
          :toKey="line.key"
        />
      </svg>
    </div>

    <!-- Node Layer -->
    <div
      class="nd-layer nodes"
      :style="{transform: `translate(${canvasPosition.x}px, ${canvasPosition.y}px)`}"
    >
      <component
        :is="nodeTypeMap[node.typeName]"
        v-for="node in nodes"
        :node="node"
        @mousedown="onNodeMouseDown"
      >
      </component>
    </div>

  </div>
</template>

<style lang="scss">
.nd-view.node-editor-view {
  height: 100%;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  background-color: #111;
}

.nd-layer.hud {
  position: absolute;
  width: 100%;
  height: 100%;

  >.mouse-info {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 9pt;
  }
}

.nd-layer.lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>