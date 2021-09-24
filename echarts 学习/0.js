let myChart = echarts.init(document.querySelector('div'));
myChart.setOption({
  title: {
    text: '康师傅方便面销量',
    textStyle: {
      color: 'blue'
    }
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
    type: 'category'
  },
  yAxis: {
    type: 'value',
  },
  series: {
    name: '康师傅的销量',
    type: 'line',
    data: [35, 29, 38, 88, 69, 89],
    markPoint: {
      data: [
        { type: 'max' },
        { type: 'min' }
      ]
    },
    markLine: {
      data: [
        { type: 'average' }
      ]
    },
    markArea: {
      data: [
        [
          { xAxis: '1月' }, // 开始月份
          { xAxis: '2月' }, // 结束月份
        ],
        [
          { xAxis: '3月' }, // 开始月份
          { xAxis: '5月' }, // 结束月份
        ],
      ]
    },
    smooth: true,
    lineStyle: {
      color: 'green',
      type: 'dotted', //solid dashed
    },
    areaStyle: {
      color: 'pink'
    }
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b} 的成绩是 {c}'
  }
})
