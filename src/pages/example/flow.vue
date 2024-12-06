<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import { Menu } from '@logicflow/extension'
import { register } from '@logicflow/vue-node-registry'
import StartNode from '~/components/StartNode.vue'
import '@logicflow/extension/lib/style/index.css'
import '@logicflow/core/lib/style/index.css'

const flowContainer = ref<HTMLElement | null>(null)
const currNodeStyle = ref<any>({})

// 流程图实例
const lf = ref<LogicFlow | null>(null)
const flowId = ref('')

const graphData = ref<LogicFlow.GraphData | unknown>()

// 获取更新后的图表数据
function getCurrGraphData() {
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
    properties: {
      width: 96,
      height: 96,
    },
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

const logicOptions = ref<LogicFlow.Options>()
onMounted(async () => {
  await nextTick()
  logicOptions.value = {
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
    // 注册组件
    plugins: [Menu],
  }
  lf.value = new LogicFlow(logicOptions.value)

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

  // 为菜单追加选项
  // @ts-expect-error ignore
  lf.value?.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: '分享',
        icon: true,
        className: 'text-green-500',
        callback() {
          alert('分享成功！')
        },
      },
      {
        text: '属性',
        callback(node: LogicFlow.NodeData) {
          alert(`
              节点id：${node.id}
              节点类型：${node.type}
              节点坐标：(x: ${node.x}, y: ${node.y})
            `)
        },
      },
    ],
    edgeMenu: [
      {
        text: '属性',
        callback(edge: LogicFlow.EdgeData) {
          const {
            id,
            type,
            startPoint,
            endPoint,
            sourceNodeId,
            targetNodeId,
          } = edge
          alert(`
              边id：${id}
              边类型：${type}
              边起点坐标：(startPoint: [${startPoint.x}, ${startPoint.y}])
              边终点坐标：(endPoint: [${endPoint.x}, ${endPoint.y}])
              源节点id：${sourceNodeId}
              目标节点id：${targetNodeId}
            `)
        },
      },
    ],
    graphMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
    ],
  })

  // 注册自定义节点
  register({
    type: 'start', // 自定义节点类型名称
    component: StartNode,
    // @ts-expect-error ignore
  }, lf.value)

  lf.value.render(flowData.value)

  lf.value.on('graph:rendered', ({ graphModel }) => {
    flowId.value = graphModel.flowId!
  })

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

// 监听dark模式变化
watch([() => isDark.value, () => lf.value], ([newDark, newLf], [oldDark, oldLf]) => {
  // 获取 DOM 元素
  const lfMenu = document.querySelector('.lf-menu')
  const lfGraph = document.querySelector('.lf-graph')

  // 检查 DOM 是否存在
  if (!lfMenu || !lfGraph)
    return

  // 处理逻辑
  if (newDark !== oldDark || newLf !== oldLf) {
    if (newDark) {
      lfMenu.classList.add('lf-menu-dark')
      lfGraph.classList.add('lf-graph-dark')
    }
    else {
      lfMenu.classList.remove('lf-menu-dark')
      lfGraph.classList.remove('lf-graph-dark')
    }
  }
}, { immediate: true })
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
        <!-- <div v-if="item.icon" h-10 w-10 class="i-carbon-assembly" /> -->
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
      <button btn @click="getCurrGraphData">
        获取图表数据
      </button>
      <pre>
        {{ graphData }}
      </pre>
    </div>
  </div>
</template>

<style>
.lf-menu-dark {
  background: #000;
  color: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.8)
}
.lf-graph-dark {
  background: #000;
}
</style>
