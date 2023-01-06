<script setup lang="ts">

</script>
<template>
    <div class="nd-layout default-layout">
        <div class="menu-bar">
            <slot name="menuBar"></slot>
        </div>
        <div class="main-area">
            <div class="main-view">
                <slot></slot>
            </div>
            <div class="secondary-view">
                <slot name="secondary"></slot>
            </div>
        </div>
        <div class="status-bar">
            <slot name="statusBar"></slot>
        </div>
    </div>
</template>
<style lang="scss">
.nd-layout.default-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    >.menu-bar {
    }
    >.main-area {
        flex-grow: 1;
        display: flex;

        >.main-view {
            width: 50%;
        }
        >.secondary-view {
            width: 50%;
        }
    }
    >.status-bar {
    }
}
</style>