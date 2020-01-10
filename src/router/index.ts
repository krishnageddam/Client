import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Admin from "../components/Admin.vue";
import Search from "../components/Search.vue";
import Analysis from "../components/Analysis.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
   path: "/search",
   name: "search",
   component: Search
  },
  {
    path: "/analysis",
    name: "analysis",
    component: Analysis
  }
];

const router = new VueRouter({
  routes
});

export default router;
