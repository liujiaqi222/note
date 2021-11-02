<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";
import "../../public/static/theme/vintage.js";
import {mapState} from 'vuex'
import { getProvinceMapInfo, name2pinyin } from "../utils/map_utils.js";
import axios from "axios";

export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, //所获取的省份地图矢量数据
    };
  },
  created() {
    this.$socket.registerCallBack('mapData', this.getData);
    // 发送数据给服务器
    this.$socket.send({
      action: 'getData',
      socketType: 'mapData',
      chartName: 'map'
    });
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
  },
  mounted() {
    this.initChart();
    window.addEventListener("resize", this.screenAdapter);
    this.$once("hook:beforeDestory", () => {
      window.removeEventListener("resize", this.screenAdapter);
    });
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      const res = await axios.get(`${this.$url}/static/map/china.json`);
      this.$echarts.registerMap("china", res.data);
      const initOption = {
        geo: {
          type: "map",
          map: "china",
          top: "15%",
          bottom: "15%",
          itemStyle: {
            areaColor: "#2e72bf",
            borderColor: "#333",
          },
        },
        title: {
          text: "▏商家分布",
          left: "20",
          top: "20",
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
        },
      };
      this.chartInstance.on("click", async (param) => {
        if (Object.keys(name2pinyin).includes(param.name)) {
          const provinceInfo = getProvinceMapInfo(param.name);
          // 判断当前所点击的这个省份的地图矢量数据是否在mapData中存在
          if (!this.mapData[provinceInfo.key]) {
            // 获取该省份地图矢量数据
            const { data } = await axios.get(this.$url + provinceInfo.path);
            this.mapData[provinceInfo.key] = data;
            this.$echarts.registerMap(provinceInfo.key, data);
          }

          const changeOption = {
            geo: {
              map: provinceInfo.key,
            },
          };
          this.chartInstance.setOption(changeOption);
        }
      });
      this.chartInstance.setOption(initOption);
    },
    getData(data) {
      this.allData = data;
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      const seriesArr = this.allData.map((item) => ({
        name: item.name,
        data: item.children,
        type: "effectScatter",
        rippleEffect: {
          scale: 5,
          brushType: "stroke",
        },
        // 如果想要在地图中显示散点的数据，需要让散点使用地图的坐标
        coordinateSystem: "geo",
      }));
      // 图例的数据
      const legendArr = this.allData.map((item) => item.name);
      const dataOption = {
        series: seriesArr,
        legend: {
          data: legendArr,
        },
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2,
          },
          itemGap: titleFontSize / 2,
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(revertOption);
    },
  },
};
</script>

<style>
</style>