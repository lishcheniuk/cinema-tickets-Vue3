import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Auth.vue"),
    beforeEnter(to, from, next) {
      if (!store.getters["auth/getUser"]) next();
      else next("/");
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter(to, from, next) {
      if (store.getters["auth/getUser"]) next();
      else next("/auth");
    },
  },
  {
    path: "/time-table",
    name: "TimeTable",
    component: () => import("../views/TimeTable.vue"),
  },
  {
    path: "/film/:id",
    name: "FilmPage",
    component: () => import("../views/FilmPage.vue"),
  },
  {
    path: "/films",
    name: "Films",
    component: () => import("../views/Films.vue"),
  },
  {
    path: "/4dx",
    name: "4dx",
    component: () => import("../views/4dx.vue"),
  },
  {
    path: "/buy-ticket/:id",
    name: "BuyTicket",
    component: () => import("../views/BuyTicket.vue"),
  },
  {
    path: "/:notFound(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
