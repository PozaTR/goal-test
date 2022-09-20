import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import All from "@/pages/All.vue";
import Active from "@/pages/Active.vue";
import Completed from "@/pages/Completed.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'All',
    component: All
  },
  {
    path: '/active',
    name: 'active',
    component: Active
  },
  {
    path: '/completed',
    name: 'completed',
    component: Completed
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
