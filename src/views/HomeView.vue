<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import Window from '@/components/Window.vue';
import DefaultLayout from '@/components/Layouts/DefaultLayout.vue';
import NodeEditorView from '@/components/Views/NodeEditorView.vue';
import ResultView from '@/components/Views/ResultView.vue';
import StatusBarView from '@/components/Views/StatusBarView.vue';
import type { Node } from '@/NodeCore/Node';
import { NumberNode, ComputeNode } from '@/NodeCore/MathNodes';

const a: NumberNode = new NumberNode('id001', 12);
a.setPosition({x: 50, y: 50});

const b: NumberNode = new NumberNode('id002', 5);
b.setPosition({x: 50, y: 150});

const c1: ComputeNode = new ComputeNode('id003');
c1.setType('Divide');
c1.addInput(a, 'A');
c1.addInput(b, 'B');
c1.setPosition({x: 250, y: 100});

const d: NumberNode = new NumberNode('id004', 3);
d.setPosition({x: 250, y: 250});

const c2: ComputeNode = new ComputeNode('id005');
c2.setType('Multiply');
c2.addInput(c1, 'A');
c2.addInput(d, 'B');
c2.setPosition({x: 450, y: 160});


console.log(c2.getOutput());

const nodes: Ref<Node[]> = ref([]);
nodes.value.push(a);
nodes.value.push(b);
nodes.value.push(c1);
nodes.value.push(d);
nodes.value.push(c2);



const activeNode: Ref<Node> = ref(c2);
const onSelectNode = (node:Node) => {
  activeNode.value = node;
}
</script>

<template>
  <main>
    <Window>
        <DefaultLayout>
            <template #default>
                <NodeEditorView :nodes="nodes" @select-node="onSelectNode"></NodeEditorView>
            </template>
            <template #secondary>
                <ResultView :node="activeNode"></ResultView>
            </template>
            <template #statusBar>
                <StatusBarView></StatusBarView>
            </template>
        </DefaultLayout>
    </Window>
  </main>
</template>
