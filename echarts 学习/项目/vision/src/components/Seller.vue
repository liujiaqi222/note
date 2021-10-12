<!-- 商家销量统计的横向统计图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //服务器返回的数据
      currentPage: 1, //当前显示的页数
      totalPage: 0, //总页数
      timerId: null, //定时器标识
    };
  },
  methods: {
    // 初始化echartsInstance 对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, "chalk");
      // 对图表初始化的控制
      const initOption = {
        title: {
          text: "▎销售统计",
          left: 20,
          top: 20,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          // 鼠标移动到坐标轴后所展示的样式
          axisPointer: {
            type: "line",
            z: 0, //调整层级
            lineStyle: {
              width: 66,
              color: "#213443",
              type: "solid", //默认为dashded
            },
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
            },
            itemStyle: {
              // ====设置颜色渐变======
              // 指明颜色渐变的方向 指明不同百分比下颜色的值
              // x1,y1,x2,y2,[]    //(x1,y1)和(x2,y2)两个点确定渐变的方向
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: "#5052ee" }, //百分之0状态下的颜色值
                { offset: 1, color: "#ab6ee5" }, //百分之100状态下的颜色值
              ]),
            },
          },
        ],
        grid: {
          top: "20%",
          left: "3%",
          right: "3%",
          bottom: "3%",
          // 上面的距离设置包含坐标轴上的文字
          containLabel: true,
        },
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    // 获取数据
    async getData() {
      const { data } = await this.$axios.get("/seller");
      this.allData = data;
      // 对数组进行排序
      this.allData.sort((a, b) => {
        return a.value - b.value;
      });
      // 每5个元素显示一页，判断总页数
      this.totalPage = Math.ceil(this.allData.length / 5);
      this.updateChart();
      this.startInterval();
    },
    // 更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      // slice只包含开头不包含结束
      const showData = this.allData.slice(start, end);
      const sellerNames = showData.map((item) => item.name);
      const sellerValues = showData.map((item) => item.value);
      const dataOption = {
        yAxis: {
          data: sellerNames,
        },
        series: [
          {
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    startInterval() {
      clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.currentPage < this.totalPage
          ? this.currentPage++
          : (this.currentPage = 1);
        this.updateChart();
      }, 3000);
    },
    // 屏幕适配
    //当浏览器大小发生变化时会调用的方法
    screenAdaptor() {
      // this.$refs.seller_ref.offsetWidth
      const titleFontSize = parseInt(
        (this.$refs.seller_ref.offsetWidth / 100) * 3.6
      );
      const adaptOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adaptOption);
      // 记得调用echarts自带的自适应方法 上面之所以要自定义是因为echarts无法改变自定义的固定宽度，如这里初始化定义的标题宽度为固定值66
      this.chartInstance.resize();
    },
  },
  mounted() {
    this.initChart();
    this.screenAdaptor();
    window.addEventListener("resize", this.screenAdaptor);
  },
  created() {
    this.getData();
  },
  destroyed() {
    clearInterval(this.timerId);
    // 移除事件监听
    window.removeEventListener('resize',this.screenAdaptor);
  },
};
</script>

<style lang="scss" scoped>
.com-chart {
  height: 100vh;
}
</style>