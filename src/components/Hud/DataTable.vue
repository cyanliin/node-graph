<script setup lang="ts">

export interface DataTableItem {
  label: string
  value: any
}

const props = defineProps<{
 datas: DataTableItem[],
}>();
</script>

<template>
  <ul class="hud data-table">
    <li v-for="item in datas">
      <label>{{ item.label }}</label>
      <span class="value">{{ item.value }}</span>
    </li>
  </ul>
</template>

<style lang="scss">
.hud.data-table {
  display: table;
  color: #777;

  >li {
    display: table-row;

    >label {
      display: table-cell;
      padding: 0 10px 0 0;
      width: 60px;
    }
    >.value {
      display: table-cell;
      width: 50px;
    }
  }
}
</style>