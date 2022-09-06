<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="fixed-top">
      <Navbar />
    </b-navbar>
  </div>
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