<template>
  <div class="screen-container">
    <header class="screen-header">
      <div>
        <img src="static/img/header_border_dark.png" />
      </div>
      <span class="logo">
        <img src="static/img/logo_dark.png" />
      </span>
      <span class="title">电商平台实时监控系统</span>
      <div class="title-right">
        <img class="qiehuan" src="/static/img/qiehuan_dark.png" />
        <span class="datetime">2049-01-01 00:00:00</span>
      </div>
    </header>
    <div class="screen-body">
      <!-- 销量趋势图表 -->
      <div class="trend" :class="[fullScreenStatus.trend ? 'fullScreen' : '']">
        <trend />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.trend ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('trend')"
          ></i>
        </div>
      </div>
      <!-- 商家分布图表 -->
      <div class="map" :class="[fullScreenStatus.map ? 'fullScreen' : '']">
        <MapChart />
        <div class="resize">
          <!-- icon-compress-alt -->
          <i
            :class="['fas', fullScreenStatus.map ? 'fa-compress-alt' : ' fa-expand-alt']"
            @click="changeSize('map')"
          ></i>
        </div>
      </div>
      <!-- 热销商品占比图表 -->
      <div class="hot" :class="[fullScreenStatus.hot ? 'fullScreen' : '']">
        <hot />
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
        <seller />
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
        <rank />
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
        <stock />
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
import Hot from '../components/Hot.vue';
import Seller from '../components/Seller.vue';
import MapChart from '../components/Map.vue';
import Rank from '../components/Rank.vue';
import Stock from '../components/Stock.vue';
import Trend from '../components/Trend.vue'

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
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  },
  methods: {
    changeSize(chartName) {
      this.$router.push({'name':chartName})
    }
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
  width: 100%;
  height: 64px;
  font-size: 20px;
  position: relative;
  > div {
    img {
      width: 100%;
    }
  }
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
  .title-right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-80%);
  }
  .qiehuan {
    width: 28px;
    height: 21px;
    cursor: pointer;
  }
  .datetime {
    font-size: 15px;
    margin-left: 10px;
  }
  .logo {
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-80%);
    img {
      height: 35px;
      width: 128px;
    }
  }
}
.screen-body {
  width: 100%;
  min-height: calc(100vh - 64px);
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
    grid-template-rows: repeat(6, calc((100vh - 164px) / 6));
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
  right: 0 !important;
  height: 100vh !important ;
  width: 100vm !important;
  margin: 0 !important;
  z-index: 1000 !important;
 
}
</style>
