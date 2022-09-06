import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/MovieSearchView.vue"),
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () => import("../views/MovieView.vue"),
  },
  {
    path: "/celebrity/:id",
    name: "celebrity",
    component: () => import("../views/CelebrityDetailsView.vue"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/UserView"),
    children: [
      {
        path: "signup",
        name: "signup",
        component: () => import("../views/User/SignupView"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("../views/User/LoginView"),
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/User/FavoritesView"),
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/User/FavoritesView"),
      },
      {
        path: "watchlist",
        name: "watchlist",
        component: () => import("../views/User/WatchlistView.vue"),
      }
    ],
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
