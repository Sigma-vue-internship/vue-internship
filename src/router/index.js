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
    meta: {
      breadCrumb: [
        { label: "Home", to: { name: "home" } },
        { label: "Search", to: { name: "search" } },
      ],
    },
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () => import("../views/MovieView.vue"),
    meta: {
      breadCrumb(route) {
        const movieId = route.params.id;
        return [
          { label: "Home", to: { name: "home" } },
          { label: "Search", to: { name: "search" } },
          { label: "Movie", to: { name: "movie", params: { id: movieId } } },
        ];
      },
    },
  },
  {
    path: "/celebrity/:id",
    name: "celebrity",
    component: () => import("../views/CelebrityDetailsView.vue"),
    meta: {
      breadCrumb(route) {
        const celebrityId = route.params.id;
        return [
          { label: "Home", to: { name: "home" } },
          { label: "Search", to: { name: "search" } },
          {
            label: "Celebrity",
            to: { name: "celebrity", params: { id: celebrityId } },
          },
        ];
      },
    },
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
      },
    ],
  },
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
