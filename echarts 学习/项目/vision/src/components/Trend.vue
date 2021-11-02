<template>
  <div class="com-container">
    <div class="title" :style="comStyle">
      <span>▏{{ showTitle }}</span>
      <i class="fas fa-chevron-down" @click="showChoice = !showChoice"></i>
      <div class="select-con" v-show="showChoice" :style='bgStyle'>
        <div
          class="select-item"
          v-for="item in selectTypes"
          :key="item.key"
          :style="marginStyle"
          @click="handleSelect(item.key)"
        >{{ item.text }}</div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";
import "../../public/static/theme/vintage.js";
import getThemeValue from '../utils/theme_utils.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //从服务器中获取的所有数据
      showChoice: false, //是否显示可选值
      choiceType: 'map',//显示的数据类型
      titleFontSize: 16, //指明标题的字体大小
    };
  },
  methods: {
    // 初始化echarts实例对象的方法
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme);
      const initOption = {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        grid: {
          left: "3%",
          top: "30%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
      };
      this.chartInstance.setOption(initOption);
    },
    async getData(data) {
      // 获取数据
      // const { data } = await this.$axios.get("trend");
      this.allData = data;
      this.initChart();
      this.screenAdapter();
      this.screenAdapter();
      this.updateChart(); //处理数据
    },

    updateChart() {
      // 处理数据
      // 处理类目轴的数据
      const timeArr = this.allData.common.month;
      // 处理y轴的数据 series
      const valueArr = this.allData[this.choiceType].data;
      // 图例的数据
      const legendArr = valueArr.map((item) => ({ name: item.name }));
      // 半透明的颜色
      const colorArr1 = [
        "rgba(11,168,44,0.5)",
        "rgba(44,110,255,0.5)",
        "rgba(22,242,217,0.5)",
        "rgba(254,33,30,0.5)",
        "rgba(250,105,0,0.5)",
      ];
      const colorArr2 = [
        "rgba(11,168,44,0)",
        "rgba(44,110,255,0)",
        "rgba(22,242,217,0)",
        "rgba(254,33,30,0)",
        "rgba(250,105,0,0)",
      ];
      const seriesArr = valueArr.map((item, index) => ({
        type: "line",
        data: item.data,
        name: item.name,
        stack: this.choiceType,
        areaStyle: {
          // x1,y1,x2,y2
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { color: colorArr1[index], offset: 0 },
            { color: colorArr2[index], offset: 1 },
          ]), //分别代表0%和100%的颜色
        },
      }));
      const dataOption = {
        xAxis: {
          data: timeArr,
        },
        series: seriesArr,
        legend: legendArr,
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: 20,
          top: "15%",
          icon: "circle",
          textStyle: {
            color: 'white'
          }
        },
      };

      this.chartInstance.setOption(dataOption);
    },
    // 处理屏幕分辨率
    screenAdapter() {
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize,
          itemGap: this.titleFontSize,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        },
      };

      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6;
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    handleSelect(currentType) {
      this.choiceType = currentType;
      this.updateChart();
      this.showChoice = false;
    }
  },
  mounted() {
    window.addEventListener("resize", this.screenAdapter);
    this.$once("hook:beforeDestory", () => {
      window.removeEventListener("resize", this.screenAdapter);
    });
  },
  created() {
    this.$socket.registerCallBack('trendData', this.getData);
    // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend'
    });
  },
  destroyed() {
    this.$socket.unRegisterCallBack(this.getData);
  },
  computed: {
    selectTypes() {
      if (!this.allData) {
        return [];
      }
      return this.allData.type.filter(item => item.key !== this.choiceType);
    },
    showTitle() {
      if (!this.allData) {
        return '';
      }
      return this.allData[this.choiceType].title;
    },
    // 设置标题样式
    comStyle() {
      return {
        fontSize: this.titleFontSize + 'px',
        color:getThemeValue(this.theme).titleColor,

      }
    },
    // 设置标题的容器颜色
    bgStyle(){
      return{
        backgroundColor:getThemeValue(this.theme).trendBgc
      }

    }
    ,
    marginStyle() {
      return {
        marginLeft: this.titleFontSize + 'px',
      }
    },
    ...mapState(['theme'])

  },
  watch: {
    theme() {
      this.chartInstance.dispose();
      this.initChart(); //用新主题来初始化
      this.screenAdapter(); //完成屏幕适配
      this.updateChart();
    }
  }
};
</script>

<style scoped lang='scss'>
.title {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .fa-chevron-down {
    cursor: pointer;
  }
  .select-con {
    cursor: pointer;
    background-color: #222733;
  }
}
</style>