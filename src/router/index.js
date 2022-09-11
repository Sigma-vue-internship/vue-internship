import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const freeAccessRouts = [
  'home',
  'search',
  'movie',
  'celebrity',
  'login',
  'missing'
];

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
      }
    ],
  },
  {
    path: "*",
    name: "missing",
    component: () => import("../views/MissingView"),
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

router.beforeEach((to, from, next) => {
  if (freeAccessRouts.includes(to.name)) {
    return next();
  }
  if (!freeAccessRouts.includes(to.name) && localStorage.getItem("sessionToken")) {
    return next();
  } else {
    return next("/login");
  }
});

export default router;
