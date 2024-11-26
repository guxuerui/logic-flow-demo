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
      x: 727,
      y: 52,
      // text: { x: 777, y: 102, value: '节点1' }, // 节点文本
      text: '节点1',
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
      x: 727,
      y: 652,
      // text: { x: 827, y: 652, value: '节点2' },
      text: '节点2',
      properties: {},
    },
    {
      id: '1',
      type: 'rect',
      x: 100,
      y: 60,
      text: '矩形',
    },
    {
      id: '2',
      type: 'circle',
      x: 300,
      y: 60,
      text: '圆形',
    },
    {
      id: '3',
      type: 'ellipse',
      x: 500,
      y: 60,
      text: '椭圆',
    },
    {
      id: '4',
      type: 'polygon',
      x: 100,
      y: 200,
      text: '多边形',
    },
    {
      id: '5',
      type: 'diamond',
      x: 300,
      y: 200,
      text: '菱形',
    },
    {
      id: '6',
      type: 'text',
      x: 500,
      y: 200,
      text: '纯文本节点',
    },
    {
      id: '7',
      type: 'html',
      x: 100,
      y: 320,
      text: 'html节点',
    },
  ],
  edges: [
    // 边数据属性
    {
      id: 'edge_id',
      type: 'polyline',
      sourceNodeId: 'node_id_1',
      targetNodeId: 'node_id_2',
      text: { x: 765, y: 241.25, value: '连线' }, // 连线文本
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

// 拖拽圆形
function handleDragCircle() {
  lf?.value?.dnd.startDrag({
    type: 'circle',
    r: 25,
    text: 'circle',
  })
}

onMounted(async () => {
  await nextTick()

  lf.value = new LogicFlow({
    container: flowContainer.value!,
    grid: true,
    // background: {
    //   backgroundColor: 'rgba(0, 0, 0, 1)',
    // },
    style: {
      rect: {
        rx: 5,
        ry: 5,
        strokeWidth: 2,
      },
      circle: {
        fill: '#f5f5f5',
        stroke: '#666',
      },
      ellipse: {
        fill: '#dae8fc',
        stroke: '#6c8ebf',
      },
      polygon: {
        fill: '#d5e8d4',
        stroke: '#82b366',
      },
      diamond: {
        fill: '#ffe6cc',
        stroke: '#d79b00',
      },
      text: {
        color: '#b85450',
        fontSize: 12,
      },
    },
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
  <div flex="~ gap-x-4" h-full>
    <div class="h-8xl w-24 py-4" b="2 gray-300 dark:gray-600" flex="~ col items-center">
      <button
        class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-200"
        hover="c-black"
        dark:hover="c-white"
        draggable
        @mousedown="handleDragCircle"
      >
        <div w-10 h-10 i-mdi-checkbox-blank-circle-outline />
      </button>
    </div>
    <div ref="flowContainer" flex="1" />
    <div class="markdown-body w-96" flex="~ col">
      <button btn bg-orange-400 hover:bg-orange-600 @click="lf?.undo()">
        上一步
      </button>
      <button btn my-4 @click="lf?.redo()">
        下一步
      </button>
      <button btn @click="getGraphData">
        获取图表数据
      </button>
      <pre>
        {{ graphData }}
      </pre>
    </div>
  </div>
</template>

<style scoped>
</style>
