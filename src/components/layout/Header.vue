<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
    <div class="container">
      <Navbar />
    </div>
  </b-navbar>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "Header",
  components: {
    Navbar,
  },
};
</script>