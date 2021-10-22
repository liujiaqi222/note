<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import Map from "../../public/static/map/china.json";
import "../../public/static/theme/chalk.js";

export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.initChart();
    window.addEventListener('resize',this.screenAdaptor);
    this.$once('hook:beforeDestory',()=>{
      window.removeEventListener('resize',this.screenAdaptor);
    })
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref,'chalk');
      this.$echarts.registerMap("china", Map);
      const initOption = {
        geo: {
          type: "map",
          map: "china",
          top:'15%',
          bottom:'15%',
          itemStyle:{
            areaColor:'#2e72bf',
            borderColor:'#333',
          }
        },
        title:{
          text:'▏商家分布',
          left:'20',
          top:'20',
        },
        legend:{
          left:'5%',
          bottom:'5%',
          orient:'vertical',
        }
      };

      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const { data } = await this.$axios.get("/map");
      this.allData = data;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      // 处理图表需要的数据
      const seriesArr = this.allData.map((item) => ({
        name: item.name,
        data: item.children,
        type: "effectScatter",
        rippleEffect:{
          scale:5,
          brushType:'stroke'
        },
      // 如果想要在地图中显示散点的数据，需要让散点使用地图的坐标
        coordinateSystem:'geo',

      }));
      // 图例的数据
      const legendArr = this.allData.map(item => item.name);
      const dataOption = {
        series:seriesArr,
        legend:{
          data:legendArr,
        }

      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdaptor() {
      const titleFontSize = this.$refs.map_ref.offsetWidth/100*3.6;
      const adapterOption = {
        title:{
          textStyle:{
            fontSize:titleFontSize,
          }
        },
        legend:{
          itemWidth:titleFontSize/2,
          itemHeight:titleFontSize/2,
          textStyle:{
            fontSize:this.titleFontSize/2
          },
          itemGap:titleFontSize/2,
        }
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style>
</style>