// import Vue from 'vue'
// 
import { createApp } from 'vue'
// 
import App from './App.vue'
// import VueRouter from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
// import router from './router'

import AreaExample from './charts/AreaExample'
import BarExample from './charts/BarExample'
import ColumnExample from './charts/ColumnExample'
import ScatterExample from './charts/ScatterExample'
import MixedExample from './charts/MixedExample'
import DonutExample from './charts/DonutExample'
import RadialBarExample from './charts/RadialBarExample'
import BubbleExample from './charts/BubbleExample'
import HeatmapExample from './charts/HeatmapExample'
import LineExample from './charts/LineExample'
import TimelineBasicExample from './charts/TimelineBasicExample'
import TimelineColorsExample from './charts/TimelineColorsExample'
import TimelineMultiExample from './charts/TimelineMultiExample'
import TimelineAdvancedExample from './charts/TimelineAdvancedExample'
import TimelineMultiSeriesExample from './charts/TimelineMultiSeriesExample'
import VueApexCharts from '../../dist/vue-apexcharts';
// 
const app = createApp(App);

// Vue.component('apexchart', VueApexCharts)
app.component('apexchart', VueApexCharts)

// Vue.use(VueRouter)

// 

// 1. Define route components.
// These can be imported from other files
const routes = [
  { path: '/area', component: AreaExample },
  { path: '/bar', component: BarExample },
  { path: '/column', component: ColumnExample },
  { path: '/mixed', component: MixedExample },
  { path: '/scatter', component: ScatterExample },
  { path: '/donut', component: DonutExample },
  { path: '/radialbar', component: RadialBarExample },
  { path: '/bubble', component: BubbleExample },
  { path: '/heatmap', component: HeatmapExample },
  { path: '/line', component: LineExample },
  { path: '/timelinebasic', component: TimelineBasicExample },
  { path: '/timelinecolors', component: TimelineColorsExample },
  { path: '/timelinemulti', component: TimelineMultiExample },
  { path: '/timelineadvanced', component: TimelineAdvancedExample },
  { path: '/timelinemultiseries', component: TimelineMultiSeriesExample }
]

// const router = new VueRouter({
//   routes: routes
// })
// router.replace('/line')

const router = createRouter({
  history:createWebHistory(),
  // base: process.env.BASE_URL,
  routes: routes
});

app.use(router)
// router.replace('/line')
// router.push('/line')

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
app.mount('#app')

