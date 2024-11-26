<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'

const flowContainer = ref<HTMLElement | null>(null)

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
})
</script>

<template>
  <div flex="~ gap-x-4" h-full>
    <div class="h-8xl w-24 py-4" b="2 gray-300 dark:gray-600" flex="~ col items-center">
      <button
        v-for="item, i in leftPanelData"
        :key="i"
        class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-200"
        :class="item.extraClass"
        hover="c-black"
        dark:hover="c-white"
        draggable
        @mousedown="handleDragNode(item.type)"
      >
        <!-- <div w-10 h-10 i-mdi-checkbox-blank-circle-outline /> -->
        <div v-if="item.icon" w-10 h-10 :class="item.icon" />
        <span>{{ item.label }}</span>
      </button>
      <!-- <button -->
      <!--   class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-200" -->
      <!--   hover="c-black" -->
      <!--   dark:hover="c-white" -->
      <!--   draggable -->
      <!--   my-4 -->
      <!--   @mousedown="handleDragNode('rect')" -->
      <!-- > -->
      <!--   <div w-10 h-10 i-mdi-crop-square /> -->
      <!-- </button> -->
      <!-- <button -->
      <!--   class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-200" -->
      <!--   hover="c-black" -->
      <!--   dark:hover="c-white" -->
      <!--   draggable -->
      <!--   @mousedown="handleDragNode('diamond')" -->
      <!-- > -->
      <!--   <div w-10 h-10 i-mdi-cards-diamond-outline /> -->
      <!-- </button> -->
      <!-- <button -->
      <!--   class="icon-btn !outline-none vertical-sub c-gray-800 dark:c-gray-200" -->
      <!--   hover="c-black" -->
      <!--   dark:hover="c-white" -->
      <!--   draggable -->
      <!--   my-4 -->
      <!--   @mousedown="handleDragNode('text')" -->
      <!-- > -->
      <!--   文本 -->
      <!-- </button> -->
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
