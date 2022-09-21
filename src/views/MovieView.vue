<template>
  <div class="movie-view">
    <SpinnerLoader
      v-if="isLoading"
      :is-loading="isLoading"
    />
    <SingleMoviePage
      v-else
      :movie="movie"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SpinnerLoader from "../components/common/SpinnerLoader";
import SingleMoviePage from "../components/movie/SingleMoviePage";
export default {
  name: "MovieView",
  components: {
    SingleMoviePage,
    SpinnerLoader,
  },
  data() {
    return {
      movie: {},
      isLoading: false,
    };
  },
  watch: {
    $route: {
      async handler() {
        try {
          this.isLoading = true;
          const response = await this.getMovie(this.$route.params.id);
          const { data } = response;
          this.movie = data;
          this.isLoading = false;
        } catch (error) {
          this.$notify({
  type: 'error',
  title: 'Important message',
  text: 'Hello user! This is a notification!'
});;
          this.isLoading = false;
        }
      },
    },
  },
  async created() {
    try {
      this.isLoading = true;
      const response = await this.getMovie(this.$route.params.id);
      const { data } = response;
      this.movie = data;
      this.isLoading = false;
    } catch (error) {
      this.$notify({
  type: 'error',
  title: 'Important message',
  text: 'Hello user! This is a notification!'
});;
      this.isLoading = false;
    }
  },
  methods: {
    ...mapActions(["getMovie"]),
  },
};
</script>
