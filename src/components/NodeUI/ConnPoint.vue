<script setup lang="ts">
import type { Vector2 } from '@/NodeCore/Utility';
import { ConnPointAlignment } from '@/NodeCore/Utility';


export interface ConnPointProps {
  position: Vector2
  label?: string
  labelAlign?: ConnPointAlignment
}

const props = withDefaults(defineProps<ConnPointProps>(), {
  position: () => { return {x: 0, y: 0} },
  label: undefined,
  labelAlign: ConnPointAlignment.Right
});
</script>

<template>
  <div
    class="conn-point"
    :style="{
      left: (position.x - 4) + 'px',
      top: (position.y - 4) + 'px'
    }"
  >
    <div
      class="point"
      :class="{ hasConnect: false }"
    />
    <div
      v-if="label"
      class="label"
      :class="{
        right: labelAlign === ConnPointAlignment.Right,
        left: labelAlign === ConnPointAlignment.Left
      }"
    >{{ label }}</div>
  </div>
</template>
<style lang="scss">
@import "@/assets/style/colors.scss";
.conn-point {
  position: absolute;
  
  >.point {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    border: 2px solid $line-color;
  }

  >.label {
    position: relative;
    font-size: 9pt;

    &.right {
      top: -4px;
      left: 15px;
    }

    &.left {
      text-align: right;
      top: -4px;
      right: 55px;
      width: 50px;
      overflow: hidden;
    }
  }
}
</style>