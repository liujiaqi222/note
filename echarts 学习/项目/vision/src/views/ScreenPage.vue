<template>
  <div class="screen-container" :style="containerStyle">
    <header class="screen-header" :style="headerStyle">
      <span class="datetime" ref='dateTime'>{{ new Date().toLocaleString('zh-cn') }}</span>
      <span class="title">电商平台实时监控系统</span>
      <img class="changeTheme" :src="themeSrc" @click="handleChangeTheme" style="cursor: pointer;" />
    </header>
    <div class="screen-body">
      <!-- 销量趋势图表 -->

      <div class="trend" :class="[fullScreenStatus.trend ? 'fullScreen' : '']">
        <trend ref="trend" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.trend ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('trend')"
          ></i>
        </div>
      </div>
      <!-- 商家分布图表 -->
      <div class="map" :class="[fullScreenStatus.mapChart ? 'fullScreen' : '']">
        <MapChart ref="mapChart" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.mapChart ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('mapChart')"
          ></i>
        </div>
      </div>
      <!-- 热销商品占比图表 -->
      <div class="hot" :class="[fullScreenStatus.hot ? 'fullScreen' : '']">
        <hot ref="hot" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.hot ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('hot')"
          ></i>
        </div>
      </div>
      <!-- 商家销售金额图表 -->
      <div class="seller" :class="[fullScreenStatus.seller ? 'fullScreen' : '']">
        <seller ref="seller" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.seller ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('seller')"
          ></i>
        </div>
      </div>

      <!-- 地区销量排行图表 -->
      <div class="rank" :class="[fullScreenStatus.rank ? 'fullScreen' : '']">
        <rank ref="rank" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.rank ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('rank')"
          ></i>
        </div>
      </div>

      <!-- 库存销量分析图表 -->
      <div class="stock" :class="[fullScreenStatus.stock ? 'fullScreen' : '']">
        <stock ref="stock" />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.stock ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('stock')"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO 更改好全屏时bug
// TODO 头部的响应式布局
// TODO 存储用户的主题选择 localStorage
// TODO 更改热销商品的颜色
import Hot from '../components/Hot.vue';
import Seller from '../components/Seller.vue';
import MapChart from '../components/Map.vue';
import Rank from '../components/Rank.vue';
import Stock from '../components/Stock.vue';
import Trend from '../components/Trend.vue';
import getThemeValue from '../utils/theme_utils.js'
import { mapState } from 'vuex'

export default {
  components: {
    Hot, MapChart, Seller, Rank, Stock, Trend
  },
  data() {
    return {
      // 定义每一个图表的全屏状态
      fullScreenStatus: {
        trend: false,
        seller: false,
        mapChart: false,
        rank: false,
        hot: false,
        stock: false,
        timer:null
      }
    }
  },
  methods: {
    changeSize(chartName) {
      // 1.改变fullScreenStatus的数据
      // this.fullScreenStatus[chartName] = !this.fullScreenStatus[chartName];
      // 2.需要调用每个图表的screenAdapter方法
      // this.$nextTick(() => {
      //   this.$refs[chartName].screenAdapter();
      // })
      const targetValue = !this.fullScreenStatus[chartName];
      // 将数据发送给服务端
      this.$socket.send({
        action: 'fullScreen',
        socketType: 'fullScreen',
        chartName,
        value: targetValue,
      })
    },

    recvData(data) {
      // 取出是哪一个图表需要切换，以及切换状态
      const chartName = data.chartName;
      const targetValue = data.value;
      // 1.改变fullScreenStatus的数据
      this.fullScreenStatus[chartName] = targetValue;
      // 2.需要调用每个图表的screenAdapter方法
      this.$nextTick(() => {
        this.$refs[chartName].screenAdapter();
      })
    },
    // 修改vuex中的数据
    handleChangeTheme() {
      // this.$store.commit('changeTheme');
      this.$socket.send({
        action: 'themeChange',
        socketType: 'themeChange',
        value: ''
      });
    },
    recvThemeChange(theme='') {
      this.$store.commit('changeTheme',theme);
    },
    getLocalTheme(){
      const localTheme = localStorage.getItem('theme');
      //如果localTheme存在且不等于state中的theme
      if(localTheme&&localTheme!==this.theme){
        this.recvThemeChange(localTheme);
      }
},
    // 实时更新时间
    getCurrentTime(){
      clearInterval(this.timer)
      this.$nextTick(()=>{
        this.timer = setInterval(() => {
        this.$refs.dateTime.textContent = new Date().toLocaleString('zh-cn');
      }, 1000);
      })
    }
  },
  created() {
    // 注册接收数据的函数
    this.$socket.registerCallBack('fullScreen', this.recvData);
    this.$socket.registerCallBack('themeChange', this.recvThemeChange);
    this.getLocalTheme();
    
  },
  destroyed() {
    this.$socket.unRegisterCallBack('fullScreen');
    clearInterval(this.timer);
    this.$socket.unRegisterCallBack('themeChange');
  },
  computed: {
    ...mapState(['theme']),
    headerBorderSrc() {
      return '';
    },
    themeSrc() {
      return '/static/img/' + getThemeValue(this.theme).themeSrc;
    },
    headerStyle() {
      return {
        'background-image': `url(static/img/${getThemeValue(this.theme).headerBorderSrc})`
      }
    },
    containerStyle() {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor,
      }
    }
  },
  mounted() {
    this.getCurrentTime();
  },

}
</script>
<style lang="scss" scoped>
.screen-container {
  width: 100%;
  padding: 0 20px;
  background-color: #161522;
  color: #fff;
  box-sizing: border-box;
}

.screen-header {
  background: url("../../public/static/img/header_border_dark.png") no-repeat
    center/cover;
  display: flex;
  height: 5rem;
  align-items: center;
  width: 100%;
  justify-content: center;
  position: relative;
  padding: 0;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    height: 4rem;
  }
  
  .title {
    margin-top: 15px;
    font-size: 1.5rem;
    font-weight: bold;
    align-self: start;
    @media (min-width:768px) {
      align-self: center;
      margin-top: 0;
    }
  }
  .datetime{
    position: absolute;
    font-size: 12px;
      bottom: 10px;
    @media (min-width:768px) {
      bottom: 20px;
      left: 0;
      font-size: 14px;
    }
  }
  .changeTheme{
    position: absolute;
    right: 0;
  }
}

.screen-body {
  width: 100%;
  min-height: calc(100vh - 74px);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 300px 400px 300px 300px 300px 300px;
  gap: 20px;
  grid-template-areas:
    "t t t t  t t t t  t t t t "
    "m m m m  m m m m  m m m m"
    "h h h h  h h h h  h h h h"
    "s s s s  s s s s  s s s s"
    "r r r r  r r r r  r r r r"
    "k k k k  k k k k  k k k k";
  .trend {
    grid-area: t;
    position: relative;
  }
  .map {
    grid-area: m;
    position: relative;
  }
  .hot {
    position: relative;
    grid-area: h;
  }
  .seller {
    position: relative;
    grid-area: s;
  }
  .rank {
    position: relative;
    grid-area: r;
  }
  .stock {
    position: relative;
    grid-area: k;
  }
  @media (min-width: 768px) {
    grid-template-rows: repeat(6, 200px);
    grid-template-areas:
      "t t t t  t t m m  m m m m"
      "t t t t  t t m m  m m m m"
      "s s s s  s s h h  h h h h "
      "s s s s  s s h h  h h h h "
      "r r r r  r r k k  k k k k"
      "r r r r  r r k k  k k k k";
  }
  @media (min-width: 1200px) {
    grid-template-rows: repeat(6, calc((100vh - 174px) / 6));
    grid-template-areas:
      "t t t m  m m m m  h h h h"
      "t t t m  m m m m  h h h h"
      "t t t m  m m m m  h h h h"
      "s s s m  m m m m  k k k k"
      "s s s r  r r r r  k k k k"
      "s s s r  r r r r  k k k k";
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

// 全屏样式的定义
div.fullScreen {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  height: 100vh !important ;
  width: 100vw !important;
  margin: 0 !important;
  z-index: 1000 !important;
  transition: all 0.3s ease;
  overflow: hidden;
}
</style>
