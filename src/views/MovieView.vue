<template>
  <div class="movie-view">
    <SpinnerLoader :isLoading="isLoading" v-if="isLoading" />
    <SingleMoviePage :movie="movie" v-else />
  </div>
</template>

<script>
import SpinnerLoader from "@/components/common/SpinnerLoader";
import SingleMoviePage from "@/components/movie/SingleMoviePage";
export default {
  name: "MovieView",
  data() {
    return {
      movie: {},
      isLoading: false,
    };
  },
  components: {
    SingleMoviePage,
    SpinnerLoader,
  },
  async created() {
    try {
      this.isLoading = true;
      const response = await this.$store.dispatch(
        "getMovie",
        this.$route.params.id
      );
      const { data } = response;
      this.movie = data;
      this.isLoading = false;
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  },
};
</script>
