<template>
  <SingleMoviePage :movie="movie" />
</template>

<script>
import SingleMoviePage from "../components/SingleMoviePage";
export default {
  name: "MovieView",
  data() {
    return {
      movie: {}
    }
  },
  components: {
    SingleMoviePage
  },
  methods: {
  },
  async created() {
    this.movie = await this.$store.dispatch("getMovie", this.$route.params.id)
  }
};
</script>

<style>
</style>
