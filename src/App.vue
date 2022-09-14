<template>
  <div id="app">
    <Header />
    <div
      no-body
      :class="getMode==='dark' ? 'darkTheme' : 'lightTheme'"
    >
      <router-view />
    </div>
    <Footer />
    <notifications
      group="error"
      type="error"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapGetters(["getMode"]),
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
  list-style: none;
}
html,
body,
#app {
  height: 100vh;
}
.darkTheme {
  min-height: 100%;
  background-image: linear-gradient(
    110.1deg,
    rgba(30, 2, 83, 1) 44.2%,
    rgba(198, 55, 160, 1) 138.2%
  );
}
.lightTheme {
  min-height: 100%;
  background-image: linear-gradient(
    110.1deg,
    rgb(243, 230, 255) 44.2%,
    rgb(255, 255, 255) 138.2%
  );
}
</style>
