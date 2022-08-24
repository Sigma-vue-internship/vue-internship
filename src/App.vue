<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import Header from "./components/Header.vue";
export default {
  components: { Header },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  font-family: Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  --bs-body-bg: #121416;
  padding-top: 4.5rem;
}
ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
