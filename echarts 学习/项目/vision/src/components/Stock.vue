<template>
  <div class="com-container">
    <div class="com-chart" ref="stock_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      
    };
  },
  mounted() {
    this.initChart();
    this.screenAdapter();
    window.addEventListener('resize',this.screenAdapter);
    this.$once('hook:beforeDestroy',()=>{
      window.removeEventListener('resize',this.screenAdapter);
    })
  },
  methods: {
    initChart() {
      const initOption = {};
      this.chartInstance = this.$echarts.init(this.$refs.stock_ref);
      this.chartInstance.setOption(initOption);
      this.getData();
    },
    async getData() {
      const {data} = await this.$axios.get('/stock');
      this.allData = data;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart(){
      const showData = this.allData.slice(0,5);
      const centerArr = [
        ['18%','40%'],
        ['50%','40%'],
        ['82%','40%'],
        ['34%','75%'],
        ['66%','75%'],
      ];
      const seriesArr = showData.map((item,index) => {
        return {
          type:'pie',
          radius:[100,90],
          center:centerArr[index],
          data:[{value:item.sales},{value:item.stock}],
        }
      });
      const dataOption = {
        series:seriesArr
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter(){
      const adapterOption ={};
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    }
  },
};
</script>

<style>
</style>