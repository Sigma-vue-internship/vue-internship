<template>
  <div id="app">
    <Header
      :mode="mode"
      @toggle="toggle"
    />
    <div
      no-body
      :class="getMode==='dark' ? 'darkTheme' : 'lightTheme'"
    >
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      mode: "dark",
    };
  },
  computed: {
    ...mapGetters(["getMode"]),
  },
  methods: {
    ...mapActions(["setMode"]),
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
        this.setMode("light");
      } else {
        this.mode = "dark";
        this.setMode("dark");
      }
    },
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
    rgb(112, 72, 185) 44.2%,
    rgb(255, 214, 244) 138.2%
  );
}
</style>
