import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/MovieSearchView.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () => import("../views/MovieView.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/celebrity/:id",
    name: "celebrity",
    component: () => import("../views/CelebrityDetailsView.vue"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/User/LoginView"),
    meta: {
      auth: false,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/UserView"),
    meta: {
      auth: true,
    },
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/User/ProfileView"),
        meta: {
          auth: true,
        },
      },
      {
        path: "favorites",
        name: "favorites",
        component: () => import("../views/User/FavoritesView"),
        meta: {
          auth: true,
        },
      },
      {
        path: "watchlist",
        name: "watchlist",
        component: () => import("../views/User/WatchlistView.vue"),
        meta: {
          auth: true,
        },
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
router.beforeEach((to, from, next) => {
  console.log(to.meta.auth);
  if (!to.meta.auth) {
    return next();
  }
  if (to.meta.auth && store.getters.getUserSessionToken) {
    return next();
  } else {
    return next("/login");
  }
});

export default router;
