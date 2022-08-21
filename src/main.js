import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import componentsUI from "@/components/UI";

Vue.config.productionTip = false;

componentsUI.forEach((component) => Vue.component(component.name, component));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
