<template>
  <div id="graph-container">
    <div class="container" ref="container"></div>
    <div class="info">
      <h3>一些解释</h3>
      <p>
        节点放多一点，方便观察效果。但是我只给梁赞，北京，天津，莫斯科设置2级节点的数据，因此其他节点点击不会产生combo
      </p>
      <h4>TODO</h4>
      <p>
        <input type="checkbox" checked />
        移除新增节点需要入栈和出栈，实现撤销的功能
      </p>
      <p>
        <input type="checkbox" checked />
        新增combo前要获取到原节点的edge连线，并运用到新的combo上
      </p>
      <p><input type="checkbox" /> 配置好节点上的tooltip</p>
      <p><input type="checkbox" /> 实现第2层combo</p>
      <p><input type="checkbox" /> 思考如何更好地布局</p>
      <p><input type="checkbox" /> 增加其他的工具栏</p>
      <p><input type="checkbox" /> 增加响应式，每步操作后自动居中</p>
      <p><input type="checkbox" /> 优化样式</p>
    </div>
  </div>
</template>

<script>
// https://blog.csdn.net/qq_37899792/article/details/120448036
// combo操作栈 https://codesandbox.io/s/distracted-carlos-xg1lk?file=/index.js
import G6 from "@antv/g6";
import { clone } from "@antv/util";
import { data, comboData } from "../data/data";
const nodeColor = ["#fff", "#f4faff", "#ffded6"];
const nodeHoverStrokeColor = ["#007dff", '"#007dff"'];
const nodeStrokeColor = ["#c1c1c1", "#d0d1d5", "#ddb8b1"];
const comboColor = ["#f1f1f1", "#ebf0f0"];
const comboStrokeColor = ["#d1d1d1", "#d2e1e1"];

const grid = new G6.Grid({ position: { x: 10, y: 10 } });
export default {
  data() {
    return {
      graph: null,
      defaultNode: {
        size: 80, // 节点大小
        type: "circle",
        style: {
          fill: nodeColor[0], // 节点填充色
          stroke: nodeStrokeColor[0], // 节点描边色
          lineWidth: 1, // 节点描边粗细
          cursor: "pointer",
        },
        labelCfg: {
          style: {
            fill: "gray", // 节点标签文字颜色
            cursor: "pointer",
          },
        },
      },
      defaultEdge: {
        type: "quadratic", // 线的类型
        style: {
          lineWidth: 1,
          cursor: "pointer",
          endArrow: {
            path: G6.Arrow.triangle(2, 6, 0),
          },
        },
        labelCfg: {
          autoRotate: true, // 边上的标签文本根据边的方向旋转
          refY: 6,
          style: {
            fill: "gray",
            cursor: "pointer",
          },
        },
      },
      nodeStateStyles: {
        hover: {
          stroke: nodeHoverStrokeColor[0],
          shadowColor: nodeHoverStrokeColor[0],
          shadowBlur: 10,
        },
        click: {
          lineWidth: 3,
        },
      },
      edgeStateStyles: {
        hover: {
          stroke: nodeHoverStrokeColor[0],
        },
      },
      defaultCombo: {
        padding: [0],
        style: {
          fill: comboColor[0], // 'transparent',
          stroke: comboStrokeColor[0], // 区域描边颜色
          opacity: 0.6,
        },
        position: "top",
        offset: 5,
        labelCfg: {
          // 标签配置属性
          position: "top",
          refY: 5, // 标签在 y 方向的偏移量
          style: {
            lineWidth: 1, // 文本描边粗细
            opacity: 1, // 文本透明度
          },
        },
      },

      appNode: {
        size: 40,
        style: {
          fill: nodeColor[1], // 节点填充色
          stroke: nodeStrokeColor[1], // 节点描边色
          lineWidth: 1, // 节点描边粗细
          cursor: "pointer",
        },
        icon: {
          show: true,
          width: 18,
          height: 18,
        },
        labelCfg: {
          // 标签配置属性
          position: "top",
        },
      },
    };
  },
  methods: {
    init() {
      const toolbar = new G6.ToolBar();

      this.graph = new G6.Graph({
        container: this.$refs.container,
        width: 900,
        height: window.innerHeight,
        plugins: [grid, toolbar],
        enabledStack: true, // 必须开启这个功能才能实现撤销和重做功能
        modes: {
          default: [
            "zoom-canvas",
            {
              type: "drag-combo",
              enableStack: false,
              onlyChangeComboSize: true,
            },
            "drag-canvas",
            {
              type: "drag-node",
              onlyChangeComboSize: true,
              enableOptimize: true,
              enableStack: false,
            },
          ], // 允许拖拽画布、放缩画布、拖拽节点
        },
        layout: {
          type: "comboCombined",
          preventOverlap: true,
          nodeSize: 80,
          outerLayout: new G6.Layout["gForce"]({
            factor: 2,

            linkDistance: (edge, source, target) => {
              const nodeSize =
                ((source.size?.[0] || 30) + (target.size?.[0] || 30)) / 2;
              return Math.min(nodeSize * 6, 700);
            },
          }),
          innerLayout: new G6.Layout["concentric"]({
            sortBy: "id",
            preventOverlap: true, // 可选，必须配合 nodeSize
            nodeSize: 70,
          }),
          comboPadding: 0,
        },
        defaultNode: this.defaultNode,
        defaultEdge: this.defaultEdge,
        defaultCombo: this.defaultCombo,
        nodeStateStyles: this.nodeStateStyles,
        edgeStateStyles: this.edgeStateStyles,
      });
      this.graph.node(this.configNode);
      this.graph.data(data);
      this.graph.render();

      this.bindEvents();
      this.graph.getRedoStack().maxStep = 100;
      this.graph.getUndoStack().maxStep = 100;
      console.log(this.graph)
      toolbar.undo = this.undo;
    },

    undo() {
      const graph = this.graph;
      const undoStack = graph.getUndoStack();
      if (!undoStack || undoStack.length === 1) {
        return;
      }
      console.log(undoStack);
      const currentData = undoStack.pop();
      if (currentData) {
        const { action } = currentData;
        graph.pushStack(action, clone(currentData.data), "redo");
        let data = currentData.data.before;
        if (action === "add") {
          data = currentData.data.after;
        }
        if (action === "addCombo") {
          data = currentData.data;
        }
        console.log(action);
        if (!data) return;
        switch (action) {
          case "visible": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const item = graph.findById(model.id);
                if (model.visible) {
                  graph.showItem(item, false);
                } else {
                  graph.hideItem(item, false);
                }
              });
            });
            break;
          }
          case "render":
          case "update":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateItem(model.id, model, false);
              });
            });
            break;
          case "changedata":
            graph.changeData(data, false);
            break;
          case "delete": {
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                const itemType = model.itemType;
                delete model.itemType;
                graph.addItem(itemType, model, false);
              });
            });
            break;
          }
          case "add":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.removeItem(model.id, false);
              });
            });
            break;
          case "updateComboTree":
            Object.keys(data).forEach((key) => {
              const array = data[key];
              if (!array) return;
              array.forEach((model) => {
                graph.updateComboTree(model.id, model.parentId, false);
              });
            });
            break;
          case "addCombo":
            {
              const { nodeIds, comboId, before } = data;
              nodeIds.forEach((id) => graph.removeItem(id, false));
              // edgeIds.forEach((id) => graph.removeItem(id, false));
              graph.uncombo(comboId);
              Object.keys(before).forEach((key) => {
                const array = before[key];
                if (!array) return;
                array.forEach((model) => {
                  const itemType = model.itemType;
                  delete model.itemType;
                  graph.addItem(itemType, model, false);
                });
              });
            }
            break;
          default:
            console.log("fuck");
        }
      }
    },
 
    bindEvents() {
      // 鼠标进入节点
      this.graph.on("node:mouseenter", (e) => {
        this.graph.setItemState(e.item, "hover");
      });
      // 鼠标离开节点
      this.graph.on("node:mouseleave", (e) => {
        this.graph.setItemState(e.item, "hover");
      });
      // 鼠标进入边
      this.graph.on("edge:mouseenter", (e) => {
        this.graph.setItemState(e.item, "hover");
      });
      // 鼠标离开边
      this.graph.on("edge:mouseleave", (e) => {
        this.graph.setItemState(e.item, "hover");
      });
      // 鼠标点击节点
      this.graph.on("node:click", (e) => {
        const nodeItem = e.item;
        const nodeId = nodeItem.get("model").id;
        this.configNodeClick(nodeItem);
        let idList = ["node1", "node2", "node3", "node4"];
        if (!idList.includes(nodeId)) return;

        this.createCombo(nodeId, nodeItem);
        // console.log(nodeItem.get('model').itemType)
        this.graph.removeItem(nodeItem, false);
      });

      // 监听栈的变化
      this.graph.on("stackchange", (e) => {
        console.log(e);
      });
    },
    // 创建combo
    createCombo(nodeId, nodeItem) {
      const n = nodeId.charAt(4) - 1;
      const comboId = `combo${Number(n) + 1}`;
      let newNodeId = [];
      // 创建节点
      for (let i = 0; i < comboData[n].combonodes.length; i++) {
        this.graph.addItem("node", comboData[n].combonodes[i], false);
        newNodeId.push(comboData[n].combonodes[i].id);
      }
      this.graph.createCombo(comboId, newNodeId);
      this.beforeNodeEdges(nodeItem, comboData[n].comboedges, comboId);
      // 创建边
      for (let i = 0; i < comboData[n].comboedges.length; i++) {
        this.graph.addItem("edge", comboData[n].comboedges[i], false);
      }
      const edgeArray = nodeItem.getEdges().map((edge) => {
        delete edge.get("model").sourceNode;
        delete edge.get("model").targetNode;
        return { ...edge.get("model"), itemType: "edge" };
      });
      this.graph.pushStack(
        "addCombo",
        {
          nodeIds: newNodeId,
          comboId,
          before: {
            nodes: [{ ...nodeItem.get("model"), itemType: "node" }],
            edges: edgeArray,
          },
        },
        "undo"
      );
      this.graph.layout();
    },

    // 节点销毁前的边，要在之后给combo连接上
    beforeNodeEdges(nodeItem, comboedges, comboId) {
      const inEdges = nodeItem.getInEdges();
      inEdges.forEach((edge) => {
        const sourceId = edge.getSource().get("model").id;
        comboedges.push({ source: sourceId, target: comboId });
      });
      const outEdges = nodeItem.getOutEdges();
      outEdges.forEach((edge) => {
        const targetId = edge.getTarget().get("model").id;
        comboedges.push({ source: comboId, target: targetId });
      });
    },

    // 配置节点的信息
    configNode(node) {
      if (node.configed) return node;
      if (node.nodeType === "place") {
        if (node.description) {
          node.label += node.description;
          node.size = 120;
        } else {
          node.label += "\n\n暂无数据";
        }
      }
      if (node.nodeType === "app") {
        Object.assign(node, this.appNode);
      }
      node.configed = true;
      return node;
    },
    // 配置点击后的效果
    configNodeClick(nodeItem) {
      const clickNodes = this.graph.findAllByState("node", "click");
      clickNodes.forEach((cn) => {
        this.graph.setItemState(cn, "click");
      });
      this.graph.setItemState(nodeItem, "click");
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
#graph-container {
  display: flex;
  gap: 10px;
}
</style>
