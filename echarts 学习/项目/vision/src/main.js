import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/css/global.css'
// 5.0需要这样引入echarts
import * as echarts from 'echarts'
Vue.config.productionTip = false

// 将全局的echarts对象挂载到vue原型实例上
Vue.prototype.$echarts = echarts;

axios.defaults.baseURL = 'http://localhost/api'
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
