<script setup lang="ts">
import { EventType } from '@logicflow/core'
import { vueNodesMap } from '@logicflow/vue-node-registry'
import { inject, onMounted, ref } from 'vue'

// 获取注入的节点和图实例
const getNode = inject('getNode') as () => any
const getGraph = inject('getGraph') as () => any

// 定义响应式变量
const percentage = ref(80)

// 生命周期逻辑
onMounted(() => {
  const node = getNode()
  const graph = getGraph()

  graph.eventCenter.on(EventType.NODE_PROPERTIES_CHANGE, (eventData: any) => {
    const keys = eventData.keys as string[]
    const content = vueNodesMap[node.type]

    if (content && eventData.id === node.id) {
      const { effect } = content

      // 更新逻辑：无 effect 默认更新，有 effect 则需匹配 keys
      if (!effect || keys.some(key => effect.includes(key))) {
        console.log('eventData --->>>', eventData)
        percentage.value = eventData.properties?.progress || 0
      }
    }
  })
})
</script>

<template>
  <div h-24 w-24 text-blue-500 class="i-carbon-square-outline" />
  <!-- <div h-24 w-24 b="2 orange-500" /> -->
</template>
