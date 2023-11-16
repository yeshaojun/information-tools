import { createRouter, createWebHistory } from "vue-router";
// 1.定义组建
const Info = () => import("@/views/home.vue");
const House = () => import("@/views/house.vue");
const Money = () => import("@/views/money.vue");
// 2.定义路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/info",
    },
    {
      path: "/info",
      name: "info",
      component: Info,
    },
    {
      path: "/house",
      name: "house",
      component: House,
    },
    {
      path: "/money",
      name: "money",
      component: Money,
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
