<template>
  <div class="com-container">
    <i class="fas fa-chevron-left" @click="toLeft"></i>
    <i class="fas fa-chevron-right" @click="toRight"></i>
    <span class="name" v-text='categoryName' :style="comStyle"></span>
    <div class="com-chart" ref="hot_ref" :style="comStyle"></div>
  </div>
</template>

<script>
import "../../public/static/theme/chalk.js";

export default {
  data() {
    return {
      allData: {},
      chartInstance: "",
      currentIndex: 0, //当前所展示的一级分类数据
      categoryName:'女装',
      titleFontSize:15,
    };
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, "chalk");
      const initOption = {
        title:{text:'▎热销商品',left:20,top:20,},
        series: [
          {
            type: "pie",
            label:{
              show:false,
            },
            // 鼠标移上去的时候，显示label
            emphasis:{
              label:{
                show:true,
              },
              labelLine:{
                show:false,
              }
            }
          },
        ],
        legend:{
          top:'15%',
          icon:'cicle'
        },
        tooltip:{
          show:true,
          formatter:(param)=>{
            let total = 0;
            param.data.children.forEach(item => total+=item.value);
            let text = '';
            param.data.children.forEach(item => {
              text += param.marker + '&nbsp' +item.name+'&nbsp&nbsp&nbsp&nbsp' +Math.round(item.value/total*100)+'%<br>';
            })
            return text;
          }
        }
      };
      this.chartInstance.setOption(initOption);
      this.getData();
    },
    async getData() {
      const { data } = await this.$axios.get("/hotproduct");
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
            children:item.children, //添加了这个属性后，会显示在tooltip的 formatter的data节点下
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
    screenAdaptor() {
      let chart = this.$refs.hot_ref;
       this.titleFontSize = (chart.offsetWidth>chart.offsetHeight?chart.offsetHeight:chart.offsetWidth)/100*3.6;
      
      const adapterOption = {
        title:{
          textStyle:{
            fontSize: this.titleFontSize+'px',
          }
        },
        legend:{
          itemWidth: this.titleFontSize,
          itemHeight: this.titleFontSize/2,
          itemGap: this.titleFontSize/2,
          textStyle:{
            fontSize: this.titleFontSize,
          }
        },
        series:[{
          radius: this.titleFontSize*8,
          center:['50%','60%']
        }]
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    toLeft(){
      this.currentIndex--;
      if(this.currentIndex<0){
        this.currentIndex = this.allData.length-1;
      }
      this.updateChart();
    },
    toRight(){
      this.currentIndex++;
      if(this.currentIndex>this.allData.length-1){
        this.currentIndex = 0;
      }
        this.updateChart();
    }
  },
  mounted() {
    this.initChart();
    this.screenAdaptor();
    window.addEventListener("resize", this.screenAdaptor);
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.screenAdaptor);
    });
  },
  computed:{
    comStyle(){
      return {fontSize: this.titleFontSize+'px'}
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
  color:white;
}
.fa-chevron-left{
  left:5%;
}
.fa-chevron-right{
  right:5%;
}
.name{
  position: absolute;
  color:white;
  bottom: 5%;
  right:  10%;
  z-index: 100;
  font-size: 40px;

}
</style>