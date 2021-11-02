<template>
  <div class="com-container">
    <i class="fas fa-chevron-left" @click="toLeft" :style="comStyle"></i>
    <i class="fas fa-chevron-right" @click="toRight" :style="comStyle"></i>
    <span class="name" v-text="categoryName" :style="comStyle"></span>
    <div class="com-chart" ref="hot_ref" :style="comStyle"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";
import "../../public/static/theme/vintage.js";
import {mapState} from 'vuex';
import getThemeValue from '../utils/theme_utils.js'

export default {
  data() {
    return {
      allData: {},
      chartInstance: "",
      currentIndex: 0, //当前所展示的一级分类数据
      categoryName: '女装',
      titleFontSize: 15,
    };
  },
  created() {
    this.$socket.registerCallBack('hotData', this.getData);
    // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'hotData',
      chartName: 'hotproduct'
    });
  },
  methods: {
    initChart() {
      console.log(this.theme);
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, this.theme);
      const initOption = {
        title: { text: '▎热销商品', left: 20, top: 20, },
        series: [
          {
            type: "pie",
            label: {
              show: false,
            },
            // 鼠标移上去的时候，显示label
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              }
            }
          },
        ],
        legend: {
          top: '15%',
          icon: 'circle',
         
        },
        tooltip: {
          show: true,
          formatter: (param) => {
            let total = 0;
            param.data.children.forEach(item => total += item.value);
            let text = '';
            param.data.children.forEach(item => {
              text += param.marker + '&nbsp' + item.name + '&nbsp&nbsp&nbsp&nbsp' + Math.round(item.value / total * 100) + '%<br>';
            })
            return text;
          }
        }
      };
      this.chartInstance.setOption(initOption);
    },

    getData(data) {
      this.allData = data;
      this.updateChart();
    },
    updateChart() {
      this.categoryName = this.allData[this.currentIndex].name;
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => item.name
      );
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children, //添加了这个属性后，会显示在tooltip的 formatter的data节点下
            
          };
        }
      );
      const dataOption = {
        series: [
          {
            data: seriesData,
          },
        ],
        legend: {
          data: legendData,
        },
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      let chart = this.$refs.hot_ref;
      this.titleFontSize = (chart.offsetWidth > chart.offsetHeight ? chart.offsetHeight : chart.offsetWidth) / 100 * 3.6;

      const adapterOption = {
        title: {
          textStyle: {
            fontSize: this.titleFontSize + 'px',
          } 
        },
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize,
          }
        },
        series: [{
          radius: this.titleFontSize * 8,
          center: ['50%', '60%']
        }]
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    toLeft() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1;
      }
      this.updateChart();
    },
    toRight() {
      this.currentIndex++;
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0;
      }
      this.updateChart();
    }
  },
  mounted() {
    this.initChart();
    this.screenAdapter();
    window.addEventListener("resize", this.screenAdapter);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.screenAdapter);
    });
  },
  computed: {
    comStyle() {
      return { fontSize: this.titleFontSize + 'px' ,color:getThemeValue(this.theme).titleColor}
    },
    ...mapState(['theme']),
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

<style lang='scss' scoped>
.fas {
  z-index: 999;
  position: absolute;
  cursor: pointer;
  top: 50%;
  font-size: 50px;
  transform: translateY(-50%);
  color: white;
}
.fa-chevron-left {
  left: 5%;
}
.fa-chevron-right {
  right: 5%;
}
.name {
  position: absolute;
  color: white;
  bottom: 5%;
  right: 10%;
  z-index: 100;
  font-size: 40px;
}
</style>