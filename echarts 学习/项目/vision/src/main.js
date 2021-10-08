import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import './assets/css/global.css'

Vue.config.productionTip = false

// 将全局的echarts对象挂载到vue原型实例上
Vue.prototype.$echarts = echarts;

axios.defaults.baseURL = 'http://localhost/api'
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
