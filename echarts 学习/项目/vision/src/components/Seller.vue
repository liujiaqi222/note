<!-- 商家销量统计的横向统计图 -->
<template>
  <div class="com-container">
      <div class="com-chart" ref="seller_ref">
12222222222222
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            chartInstance:null,
        }
    },
    methods:{
        // 初始化echartsInstance 对象
        initChart(){
            console.log(this.$echarts);
},
        // 获取数据
        async getData(){
           const ret = await this.$axios.get('/seller');
           console.log(ret);
        },
        // 更新图表
        updateChart() {
            
        },
    },
    mounted(){
        this.initChart();
    },
    created(){
        this.getData();
    }
}
</script>

<style>

</style>