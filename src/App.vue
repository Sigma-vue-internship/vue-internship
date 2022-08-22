<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/history">Task History</router-link>
      <router-view />
    </nav>
  </div>
</template>

<script>
import router from "./router/index.js";
import store
 from "./store";
export default {
  name: "App",
  router: router,
  store: store
}
</script>

<style>
  html {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to bottom, #af85b8, #bca1ca, #cbbdda, #ded9e8, #f4f4f4);
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
