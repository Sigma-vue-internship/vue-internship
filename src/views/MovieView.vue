<template>
  <div>
    <SpinnerLoader :isLoading="isLoading" v-if="isLoading" />
    <SingleMoviePage :movie="movie" v-else />
  </div>
</template>

<script>
import SpinnerLoader from "../components/SpinnerLoader";
import SingleMoviePage from "../components/SingleMoviePage";
export default {
  name: "MovieView",
  data() {
    return {
      movie: {},
      isLoading: false
    }
  },
  components: {
    SingleMoviePage,
    SpinnerLoader
  },
  async created() {
    try {
      this.isLoading = true;
      this.movie = await this.$store.dispatch("getMovie", this.$route.params.id);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }
};
</script>

<style>
</style>
