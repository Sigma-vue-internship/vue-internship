import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

let routes = [
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
    path: "/login",
    name: "login",
    component: () => import("../views/User/LoginView"),
  },
  {
    path: "/user",
    name: "user",
    component: () => import("../views/User/UserView"),
    children: [
      {
        path: "profile",
        name: "profile",
        component: () => import("../views/User/ProfileView"),
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

routes = routes.map((route) => {
  if (route.path !== "/user") {
    route.meta = {
      auth: false,
    };
    return route;
  }
  route.meta = {
    auth: true,
  };
  route.children = route.children.map((route) => {
    route.meta = {
      auth: true,
    };
    return route;
  });
  return route;
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
router.beforeEach((to, from, next) => {
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
