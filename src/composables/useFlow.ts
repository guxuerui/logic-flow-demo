import type { LeftPanelData } from '~/types'

// 流程图原始数据
export const flowData = ref({
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

// 左侧操作面板定义数据
export const leftPanelData = ref<LeftPanelData[]>([
  {
    type: 'circle',
    icon: 'i-carbon-circle-outline',
    label: '圆形',
  },
  {
    type: 'rect',
    icon: 'i-carbon-square-outline',
    extraClass: 'my-4',
    label: '矩形',
  },
  {
    type: 'diamond',
    icon: 'i-carbon-diamond-outline',
    label: '菱形',
  },
  {
    type: 'text',
    extraClass: 'my-4',
    label: '纯文本',
  },
])

export const currentEdgeId = ref('')

export const currentNodeId = ref('')
