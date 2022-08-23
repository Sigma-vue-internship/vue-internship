import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
    path: "/actor/:id",
    name: "actor",
    component: () => import("../views/CelebrityDetailsView.vue"),
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import("../views/User/ProfileView"),
    children: [
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/User/FavoritesView"),
      },
      {
        path: "watchlist",
        name: "watchlist",
        component: () => import("../views/User/WatchlistView.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
