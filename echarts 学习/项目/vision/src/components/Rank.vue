<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";
import "../../public/static/theme/vintage.js";
import {mapState} from 'vuex'

export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      startValue: 0,
      endValue: 9,
      timerId: "",
    };
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rank_ref, this.theme);
      const initOption = {
        title: {
          text: "▎地区销售排行",
          left: 20,
          top: 20,
        },
        grid: {
          top: "25%",
          left: "5%",
          right: "5%",
          bottom: "10%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
     getData(data) {
      this.allData = data.sort((a, b) => {
        return b.value - a.value;
      });
      this.updateChart();
      this.startInterval();
    },
    updateChart() {
      const colorArr = [
        ["#0ba82c", "#4ff778"],
        ["#2e72bf", "#23e5e5"],
        ["#5052ee", "#ab6ee5"],
      ];
      // 处理图表所需的数据
      // 所有省份形成的数组
      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      // 所有省份对应的销售金额
      const valueArr = this.allData.map((item) => {
        return item.value;
      });
      const dataOption = {
        xAxis: {
          data: provinceArr,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (param) => {
                let targetColor = null;
                if (param.value > 300) {
                  targetColor = colorArr[0];
                } else if (param.value > 200) {
                  targetColor = colorArr[1];
                } else {
                  targetColor = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: targetColor[0] },
                  { offset: 1, color: targetColor[1] },
                ]);
              },
            },
          },
        ],
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.rank_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              borderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
            }
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      this.timerId && clearInterval(this.timeId);
      this.timerId = setInterval(() => {
        this.startValue++;
        this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 2000);
      this.$once("hook:beforeDestory", () => {
        clearInterval(this.timerId);
      });
    },
  },
  created() {
    this.$socket.registerCallBack('rankData', this.getData);
    // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'rankData',
      chartName: 'rank'
    });
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  computed:{
    ...mapState(['theme'])
  },
  watch:{
    theme(){
      this.chartInstance.dispose();
      this.initChart(); //用新主题来初始化
      this.screenAdapter(); //完成屏幕适配
      this.updateChart(); 
    }
  }
};
</script>

<style>
</style>