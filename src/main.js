import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org",
});

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: "6dea3fe2eb0c52fe2c7bcbd5148b10d4",
  };
  return config;
});

Vue.use(BootstrapVue);
Vue.use(VueAxios, axiosInstance);
store.axios = axiosInstance;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
