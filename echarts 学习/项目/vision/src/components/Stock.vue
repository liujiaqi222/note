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
    };
  },
 mounted() {
    this.screenAdapter();
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

      console.log(this.allData, 1);
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
      const colorArr = [['#4ff778', '#0ba82c'], ['#e5dd45', '#e8b11c'], ['#e8821c', '#e55445'], ['#5052ee', '#ab6ee5'], ['#23e5e5', '#2e78bf']];
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          radius: [100, 90],
          center: centerArr[index],
          data: [
            {
              value: item.stock, name: item.name + '\n' + item.sales, itemStyle: {
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
            color: colorArr[index][0]
          },
        };
      });
      const dataOption = {
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const box = this.$refs.stock_ref;
      const titleFontSize = box.offsetWidth < box.offsetHeight ? box.offsetWidth / 100 * 3.6 : box.offsetHeight / 100 * 3.6;
      const innerRadius = titleFontSize * 2;
      const outterRadius = titleFontSize * 1.125;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        series: [
          {
            raduis: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.4
            }
          },
          {
            raduis: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.4
            }
          },
          {
            raduis: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.4
            }
          },
          {
            raduis: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.4
            }
          },
          {
            raduis: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.4
            }
          },

        ]
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