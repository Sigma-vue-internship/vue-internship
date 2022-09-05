import Vue from "vue";
import Notifications from "vue-notification";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import withUUID from "vue-uuid";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import directives from "./directives";
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    api_key: "6dea3fe2eb0c52fe2c7bcbd5148b10d4",
    ...config.params,
  };
  return config;
});

store.axios = axiosInstance;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axiosInstance);
Vue.use(Notifications);
Vue.use(withUUID);

directives.forEach((directive) => {
  Vue.directive(directive.name, directive);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
