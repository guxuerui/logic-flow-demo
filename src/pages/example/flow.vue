<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'

const flowContainer = ref<HTMLElement | null>(null)

const data = ref({
  nodes: [
    // 节点数据属性：节点1
    {
      id: 'node_id_1',
      type: 'rect',
      x: 50,
      y: 50,
      text: { x: 100, y: 100, value: '节点1' }, // 节点文本
      properties: {
        width: 80,
        height: 80,
        style: {
          stroke: 'skyblue',
        },
        isPass: 'true', // 例如：在审批流场景，我们定义某个节点，这个节点通过了，节点为绿色，不通过节点为红色。
      },
    },
    // 节点2
    {
      id: 'node_id_2',
      type: 'circle',
      x: 200,
      y: 300,
      text: { x: 300, y: 300, value: '节点2' },
      properties: {},
    },
  ],
  edges: [
    // 边数据属性
    {
      id: 'edge_id',
      type: 'polyline',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_2',
      text: { x: 139, y: 200, value: '连线' }, // 连线文本
      properties: {},
    },
  ],
})

// 流程图实例
const lf = ref<LogicFlow | null>(null)

const graphData = ref<LogicFlow.GraphData | unknown>()

// 获取更新后的图表数据
function getGraphData() {
  if (!lf.value)
    return

  graphData.value = lf.value.getGraphData()
}

onMounted(async () => {
  await nextTick()

  lf.value = new LogicFlow({
    container: flowContainer.value!,
    grid: true,
    // background: {
    //   backgroundColor: 'rgba(0, 0, 0, 1)',
    // },
  })

  lf.value.setTheme({
    baseEdge: {
      stroke: 'orange',
      strokeWidth: 4,
    },
    // line: {
    //   stroke: 'green',
    //   strokeWidth: 2,
    // },
  })
  lf.value.render(data.value)
})
</script>

<template>
  <div flex="~" h-full>
    <div class="markdown-body w-96">
      <button btn @click="getGraphData">
        获取graphData
      </button>
      <pre>
        {{ graphData }}
      </pre>
    </div>
    <div ref="flowContainer" flex="1" />
  </div>
</template>

<style scoped>
</style>
