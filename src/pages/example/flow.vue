<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'

const flowContainer = ref<HTMLElement | null>(null)
const currNodeStyle = ref<any>({})

// 流程图实例
const lf = ref<LogicFlow | null>(null)

const graphData = ref<LogicFlow.GraphData | unknown>()

// 获取更新后的图表数据
function getGraphData() {
  if (!lf.value)
    return

  graphData.value = lf.value.getGraphData()
}

// 拖拽图形
function handleDragNode(type: string) {
  lf?.value?.dnd.startDrag({
    type,
    r: 25,
    text: type,
  })

  lf?.value?.setTheme({
    text: {
      color: 'green',
      fontSize: 18,
      background: {
        fill: 'transparent',
      },
    },
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

  lf.value.render(flowData.value)

  // 监听边点击事件
  lf.value.on('edge:click', ({ data }) => {
    const edgeModel = lf.value?.getEdgeModelById(data.id)

    if (!currentEdgeId.value) {
      edgeModel?.setProperties({
        style: {
          stroke: 'red',
          strokeWidth: 6,
        },
      })
      currentEdgeId.value = data.id
    }
    else {
      edgeModel?.setProperties({
        style: {
          stroke: 'orange',
          strokeWidth: 4,
        },
      })
      currentEdgeId.value = ''
    }
    // lf.value?.graphModel?.selectEdgeById(data.id, true)
  })

  // 监听节点 点击事件
  lf.value.on('node:click', ({ data }) => {
    if (!Object.keys(currNodeStyle.value).length)
      currNodeStyle.value = data.properties ?? {}

    const nodeModel = lf.value?.getNodeModelById(data.id)

    if (!currentNodeId.value) {
      // currNodeStyle.value = data.properties ?? {}

      nodeModel?.setProperties({
        style: {
          stroke: 'red',
          strokeWidth: 6,
        },
      })
      currentNodeId.value = data.id
    }
    else {
      nodeModel?.setProperties(currNodeStyle.value?.style ? currNodeStyle.value : { ...currNodeStyle.value, style: {} })
      currentNodeId.value = ''
    }
  })
})

// 删除边
function deleteEdge() {
  lf.value?.graphModel?.deleteEdgeById(currentEdgeId.value)
  currentEdgeId.value = ''
}

// 删除节点
function deleteNode() {
  lf.value?.graphModel?.deleteNode(currentNodeId.value)
  currentNodeId.value = ''
}
</script>

<template>
  <div flex="~ gap-x-4" h-full>
    <div class="h-8xl w-24 py-4" b="2 gray-300 dark:gray-600" flex="~ col items-center">
      <button
        v-for="item, i in leftPanelData"
        :key="i"
        class="vertical-sub c-gray-800 icon-btn dark:c-gray-200 !outline-none"
        :class="item.extraClass"
        hover="c-black"
        dark:hover="c-white"
        draggable
        @mousedown="handleDragNode(item.type)"
      >
        <!-- <div v-if="item.icon" h-10 w-10 class="i-carbon-diamond-outline" /> -->
        <div v-if="item.icon" h-10 w-10 :class="item.icon" />
        <span>{{ item.label }}</span>
      </button>
    </div>
    <div ref="flowContainer" flex="1" />
    <div class="markdown-body w-72" flex="~ col">
      <button :disabled="!currentEdgeId" bg-red-400 btn hover:bg-red-600 @click="deleteEdge">
        删除边
      </button>
      <button :disabled="!currentNodeId" my-4 bg-red-400 btn hover:bg-red-600 @click="deleteNode">
        删除节点
      </button>
      <button bg-orange-400 btn hover:bg-orange-600 @click="lf?.undo()">
        上一步
      </button>
      <button my-4 btn @click="lf?.redo()">
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
