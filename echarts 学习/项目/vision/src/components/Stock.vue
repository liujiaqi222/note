<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";

export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, //当前显示数据的其实值
      timerId: null, //定时器标识
      titleFontSize: 16,
    };
  },
  mounted() {
    window.addEventListener("resize", this.screenAdapter);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.screenAdapter);
    });
  },
  created() {
    // 先注册这样一个回调函数，等下给服务器发送请求后就会用到这个getData的函数
    this.$socket.registerCallBack('stockData', this.getData);
    // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'stockData',
      chartName: 'stock'
    });
  },
  methods: {
    initChart() {
      const initOption = {
        title: {
          text: "▎库存和销量分析",
          left: 20,
          top: 20,
        },
      };
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref, "chalk");
      this.chartInstance.setOption(initOption);
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on('mouseout', () => {
        this.startInterval();
      });
    },
    getData(data) {
      this.allData = data;
      this.initChart(); //获取数据后再初始化
      this.screenAdapter();
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const showData = this.allData.slice(this.currentIndex, this.currentIndex + 5);
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      const innerRadius = parseInt(this.titleFontSize * 4);
      const outterRadius = parseInt(this.titleFontSize * 3);
      console.log(innerRadius,outterRadius);
      const colorArr = [['#4ff778', '#0ba82c'], ['#e5dd45', '#e8b11c'], ['#e8821c', '#e55445'], ['#5052ee', '#ab6ee5'], ['#23e5e5', '#2e78bf']];
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          center: centerArr[index],
          data: [
            {
              value: item.stock, name: item.name + '\n\n' + item.sales, itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0]
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1]
                  }
                ])
              }
            },
            {
              value: item.sales, itemStyle: {
                color: '#333843'
              }
            },
          ],
          emphasis: {
            scale: false
          },
          labelLine: {
            show: false,
          },
          label: {
            position: 'center',
            color: colorArr[index][0],
            fontSize: this.titleFontSize / 1.4
            
          },
          radius: [outterRadius, innerRadius],
        };
      });

      const dataOption = {
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const box = this.$refs.stock_ref;
      this.titleFontSize = box.offsetWidth < box.offsetHeight ? box.offsetWidth / 100 * 3.6 : box.offsetHeight / 100 * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize
          }
        },
      };

      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      this.timerId && clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.currentIndex === 0 ? this.currentIndex = 5 : this.currentIndex = 0;
        this.updateChart();
      }, 5000);
      this.$once('hook:beforeDestory', () => {
        clearInterval(this.timerId);
      })
    }
  },
};
</script>

<style>
</style>