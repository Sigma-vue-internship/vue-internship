<template>
  <div id="app">
    <Header />
    <div no-body class="router">
      <Breadcrumbs />
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import Footer from "./components/layout/Footer.vue";
import Breadcrumbs from "./components/layout/Breadcrumbs.vue";
import Header from "./components/layout/Header.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
    Breadcrumbs,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
html,
body,
#app {
  height: 100vh;
  /* padding-top: 8px; */
}
.router {
  min-height: 100%;
  background-image: linear-gradient(
    110.1deg,
    rgba(30, 2, 83, 1) 44.2%,
    rgba(198, 55, 160, 1) 138.2%
  );
}
</style>
