<template>
  <div id="app">
    <Header />
    <router-view class="content"/>
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header";
import Footer from './components/Footer.vue';
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  height: 100%;
}
</style>
