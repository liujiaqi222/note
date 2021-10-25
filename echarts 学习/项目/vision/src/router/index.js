import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/sellerpage',
    name: 'SellerPage',
    component: () => import('../views/SellerPage.vue')
  },
  {
    path: '/trendpage',
    name: 'TrendPage',
    component: () => import('../views/TrendPage.vue'),
  },
  {
    path: '/mappage',
    name: 'MapPage',
    component: () => import('../views/MapPage.vue'),
  },
  {
    path: '/rankpage',
    name: 'RankPage',
    component: () => import('../views/RankPage.vue'),
  },
  {
    path: '/hotpage',
    name: 'HotPage',
    component: () => import('../views/HotPage.vue'),
  },
  {
    path: '/stockpage',
    name: 'StockPage',
    component: () => import('../views/StockPage.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
