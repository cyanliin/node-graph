<script setup lang="ts">
import type { Node } from '../NodeCore/Node';
import { computed } from 'vue';
import { Vector2 } from '@/NodeCore/Utility';

const props = defineProps<{
 from: Node,
 to: Node,
 toKey: string,
}>();

const fromPoint = computed(() => {
  return Vector2.add(props.from.position, props.from.outputPoint);
})

const toPoint = computed(() => {
  return Vector2.add(props.to.position, props.to.inputs[props.toKey].offset);
})

</script>
<template>
  <line
    class="conn-line"
    :x1="fromPoint.x" :y1="fromPoint.y"
    :x2="toPoint.x" :y2="toPoint.y"
    style="stroke-width: 2px"
  />
</template>
<style lang="scss">
@import "@/assets/style/colors.scss";
.conn-line {
  stroke: $line-color;
}
</style>