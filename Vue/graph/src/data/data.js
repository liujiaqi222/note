const data = {
  // 点集
  nodes: [
    {
      id: "node1",
      label: "梁赞",
      description: "\n\n主机108\n 连接47",
      nodeType: "place",
    },
    {
      id: "node2",
      label: "北京",
      description: "\n\n主机108\n 连接47",
      nodeType: "place",
    },
    {
      id: "node3",
      label: "天津",
      nodeType: "place",
      description: "\n\n主机108\n 连接47",
    },
    {
      id: "node4",
      label: "莫斯科",
      nodeType: "place",
      description: "\n\n主机108\n 连接47",
    },
    {
      id: "node5",
      label: "悉尼",
      nodeType: "place",
      description: "\n\n主机108\n 连接47",
    },
    {
      id: "node6",
      label: "长沙",
      nodeType: "place",
      description: "\n\n主机18\n 连接47",
    },
    {
      id: "node7",
      label: "南京",
      nodeType: "place",
      description: "\n\n主机18\n 连接47",
    },
    {
      id: "node10",
      label: "无锡",
      nodeType: "place",
    },
    {
      id: "node11",
      label: "南昌",
      nodeType: "place",
    },
  ],
  edges: [
    {
      source: "node1",
      target: "node2",
      label: 20,
      id: "edge1",
    },
    {
      source: "node2",
      target: "node3",
      label: 30,
      id: "edge2",
    },
    {
      source: "node3",
      target: "node4",
      label: 40,
      id: "edge3",
    },
    {
      source: "node4",
      target: "node1",
      label: 19,
      id: "edge4",
    },
    {
      source: "node5",
      target: "node1",
      label: 25,
      id: "edge5",
    },
    {
      source: "node6",
      target: "node3",
      label: 39,
      id: "edge6",
    },
    {
      source: "node7",
      target: "node2",
      label: 17,
      id: "edge7",
    },
    {
      source: "node6",
      target: "node7",
      label: 17,
      id: "edge8",
    },
  ],
};

const comboData = [
  {
    combonodes: [
      { id: '1-cnode1', label: 'mysql', nodeType: 'app' },
      { id: '1-cnode2', label: '防火墙', nodeType: 'app' },
      { id: '1-cnode3', label: '应用1', nodeType: 'app' },
      { id: '1-cnode4', label: "应用2", nodeType: 'app' },
      { id: '1-cnode5', label: 'web', nodeType: 'app' },
      { id: '1-cnode6', label: 'mongo', nodeType: 'app' },
      { id: '1-cnode7', label: '应用4', nodeType: 'app' },
      { id: '1-cnode8', label: '应用5', nodeType: 'app' },
    ],
    comboedges: [
      { source: '1-cnode1', target: '1-cnode3', label: 30 },
      { source: '1-cnode4', target: '1-cnode3', label: 40 },
      { source: '1-cnode2', target: '1-cnode8', label: 10 },
      { source: '1-cnode3', target: '1-cnode7', label: 18 },
      { source: '1-cnode5', target: '1-cnode6', label: 32 },
      { source: '1-cnode6', target: '1-cnode8', label: 20 },
      // { source: 'node4', target: 'combo1', label: 18 },
      // { source: 'node5', target: 'combo1', label: 17 },
      // { source: 'combo1', target: 'node2', label: 18 },
    ]
  },
  {
    combonodes: [
      { id: '2-cnode1', label: 'mysql', nodeType: 'app' },
      { id: '2-cnode2', label: '防火墙', nodeType: 'app' },
      { id: '2-cnode3', label: '应用1', nodeType: 'app' },
      { id: '2-cnode4', label: "应用2", nodeType: 'app' },
      { id: '2-cnode5', label: 'web', nodeType: 'app' },
      { id: '2-cnode6', label: 'mongo', nodeType: 'app' },
      { id: '2-cnode7', label: '应用4', nodeType: 'app' },
      { id: '2-cnode8', label: '应用5', nodeType: 'app' },

    ],
    comboedges: [
      { source: '2-cnode1', target: '2-cnode3' },
      { source: '2-cnode4', target: '2-cnode3' },
      { source: '2-cnode7', target: '2-cnode1' },
      { source: '2-cnode3', target: '2-cnode7' },
      { source: '2-cnode5', target: '2-cnode6' },
      { source: '2-cnode6', target: '2-cnode8' },
      // { source: 'node1', target: 'combo2' },
      // { source: 'node7', target: 'combo2' },
      // { source: 'combo2', target: 'node3' },
    ]
  },
  {
    combonodes: [
      { id: '3-cnode1', label: 'mysql', nodeType: 'app' },
      { id: '3-cnode2', label: '防火墙', nodeType: 'app' },
      { id: '3-cnode3', label: '应用1', nodeType: 'app' },
      { id: '3-cnode4', label: "应用2", nodeType: 'app' },
      { id: '3-cnode5', label: 'web', nodeType: 'app' },
      { id: '3-cnode6', label: 'mongo', nodeType: 'app' },
      { id: '3-cnode7', label: '应用4', nodeType: 'app' },
      { id: '3-cnode8', label: '应用5', nodeType: 'app' },

    ],
    comboedges: [
      { source: '3-cnode1', target: '3-cnode3' },
      { source: '3-cnode4', target: '3-cnode3' },
      { source: '3-cnode7', target: '3-cnode1' },
      { source: '3-cnode3', target: '3-cnode7' },
      { source: '3-cnode5', target: '3-cnode6' },
      { source: '3-cnode6', target: '3-cnode8' },
      // { source: 'node2', target: 'combo3' },
      // { source: 'node6', target: 'combo3' },
      // { source: 'combo3', target: 'node4' },
    ]
  },
  {
    combonodes: [
      { id: '4-cnode1', label: 'mysql', nodeType: 'app' },
      { id: '4-cnode2', label: '防火墙', nodeType: 'app' },
      { id: '4-cnode3', label: '应用1', nodeType: 'app' },
      { id: '4-cnode4', label: "应用2", nodeType: 'app' },
      { id: '4-cnode5', label: 'web', nodeType: 'app' },
      { id: '4-cnode6', label: 'mongo', nodeType: 'app' },
      { id: '4-cnode7', label: '应用4', nodeType: 'app' },
      { id: '4-cnode8', label: '应用5', nodeType: 'app' },

    ],
    comboedges: [
      { source: '4-cnode1', target: '4-cnode3' },
      { source: '4-cnode4', target: '4-cnode3' },
      { source: '4-cnode7', target: '4-cnode1' },
      { source: '4-cnode3', target: '4-cnode7' },
      { source: '4-cnode5', target: '4-cnode6' },
      { source: '4-cnode6', target: '4-cnode8' },
      // { source: 'node3', target: 'combo4' },
      // { source: 'combo4', target: 'node1' },
    ]
  },
]


export {
  data, comboData
}