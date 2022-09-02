<template>
  <div id="app">
    <Header />
    <b-card no-body class="router pb-5">
      <router-view />
    </b-card>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
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
  height: 100%;
}
.router {
  min-height: 100%;
  background-color: #121416 !important;
}
</style>
