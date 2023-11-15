import { createRouter, createWebHistory } from "vue-router";
// 1.定义组建
import HomeView from "../components/HomeView.vue";

// 2.定义路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../components/AboutView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});

router.onError((error, to, from) => {
  console.log("router.onError", error, to, from);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed =
    error.match(pattern) || error.message.match(pattern);
  if (isChunkLoadFailed) {
    window.location.reload();
  } else {
    console.log(error);
  }
});

export default router;
