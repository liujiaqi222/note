import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.css'
// 5.0需要这样引入echarts
import * as echarts from 'echarts'
import 'animate.css';

Vue.config.productionTip = false;

import SocketService from './utils/socket_service.js'

// 对服务端进行websocket的连接
SocketService.Instance.connect();

// 将socketservice实例对象挂载到原型上
Vue.prototype.$socket = SocketService.Instance;

// 将全局的echarts对象挂载到vue原型实例上
Vue.prototype.$echarts = echarts;

axios.defaults.baseURL = 'http://localhost/api'
Vue.prototype.$axios = axios;
Vue.prototype.$url = 'http://localhost:8080'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
