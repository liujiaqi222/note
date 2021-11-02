import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ScreenPage',
    component: () => import('../views/ScreenPage.vue'),
  }
  ,
  {
    path: '/sellerpage',
    name: 'seller',
    component: () => import('../views/SellerPage.vue')
  },
  {
    path: '/trendpage',
    name: 'trend',
    component: () => import('../views/TrendPage.vue'),
  },
  {
    path: '/mappage',
    name: 'map',
    component: () => import('../views/MapPage.vue'),
  },
  {
    path: '/rankpage',
    name: 'rank',
    component: () => import('../views/RankPage.vue'),
  },
  {
    path: '/hotpage',
    name: 'hot',
    component: () => import('../views/HotPage.vue'),
  },
  {
    path: '/stockpage',
    name: 'stock',
    component: () => import('../views/StockPage.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
