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
      <section class="screen-left">
        <!-- 销量趋势图表 -->
        <div id="left-top" :class="[fullScreenStatus.trend ? 'fullScreen' : '']">
          <trend />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.trend ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
        <!-- 商家销售金额图表 -->
        <div id="left-bottom" :class="[fullScreenStatus.seller ? 'fullScreen' : '']">
          <seller />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.seller ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
      </section>
      <!-- 商家分布图表 -->
      <section class="screen-middle">
        <div id="middle-top" :class="[fullScreenStatus.map ? 'fullScreen' : '']">
          <MapChart />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.map ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
        <!-- 地区销量排行图表 -->
        <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullScreen' : '']">
          <rank />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.rank ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
      </section>
      <section class="screen-right">
        <!-- 热销商品占比图表 -->
        <div id="right-top" :class="[fullScreenStatus.hot ? 'fullScreen' : '']">
          <hot />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.hot ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
        <!-- 库存销量分析图表 -->
        <div id="right-bottom" :class="[fullScreenStatus.stock ? 'fullScreen' : '']">
          <stock />
          <div class="resize">
            <!-- icon-compress-alt -->
            <i :class="['fas', fullScreenStatus.stock ? 'fa-compress-alt' : ' fa-expand-alt']"></i>
          </div>
        </div>
      </section>
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
        trend: true,
        seller: false,
        map: false,
        rank: false,
        hot: false,
        stock: false
      }
    }
  }
}
</script>
<style lang="scss" scoped>

.screen-container {
  width: 100%;
  height: 100%;
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
  height: 100%;
  display: flex;
  margin-top: 10px;
  .screen-left {
    height: 100%;
    width: 27.6%;
    #left-top {
      height: 53%;
      position: relative;
    }
    #left-bottom {
      height: 31%;
      margin-top: 25px;
      position: relative;
    }
  }
  .screen-middle {
    height: 100%;
    width: 41.5%;
    margin-left: 1.6%;
    margin-right: 1.6%;
    #middle-top {
      width: 100%;
      height: 56%;
      position: relative;
    }
    #middle-bottom {
      margin-top: 25px;
      width: 100%;
      height: 28%;
      position: relative;
    }
  }
  .screen-right {
    height: 100%;
    width: 27.6%;
    #right-top {
      height: 46%;
      position: relative;
    }
    #right-bottom {
      height: 38%;
      margin-top: 25px;
      position: relative;
    }
  }
}
.resize {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

// 全屏样式的定义
.fullScreen {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  height: 100% !important ;
  width: 100% !important;
  margin: 0 !important;
  z-index: 1000 !important;
}
</style>
