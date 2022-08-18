<template>
  <div id="app">
    <ClickCounter />
    <HoverCounter />
  </div>
</template>

<script>


import HoverCounter from "@/components/HoverCounter";
import ClickCounter from "@/components/ClickCounter";
export default {
  name: 'App',
  components: {
    ClickCounter,
    HoverCounter
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 100px;
}
</style>
