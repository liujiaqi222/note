<!-- 商家销量统计的横向统计图 -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref">12222222222222</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null, //服务器返回的数据
      currentPage: 1, //当前显示的页数
      totalPage: 0, //总页数
    };
  },
  methods: {
    // 初始化echartsInstance 对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref);
    },
    // 获取数据
    async getData() {
      const { data } = await this.$axios.get("/seller");
      this.allData = data;
      // 对数组进行排序
      this.allData.sort((a, b) => {
        return a.value - b.value;
      });
      // 每5个元素显示一页，判断总页数
      this.totalPage = Math.cell(this.allData.length / 5);
      this.updateChart();
    },
    // 更新图表
    updateChart() {
      const showData = this.allData;
      const sellerNames = showData.map((item) => item.name);
      const sellerValues = showData.map((item) => item.value);
      const option = {
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: sellerNames,
        },
        series: [
          {
            type: "bar",
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
  },
  mounted() {
    this.initChart();
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.com-chart {
  height: 600px;
}
</style>