import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/sandbox",
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    component: () => import("@/views/sandbox/index.vue"),
    meta: {},
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
