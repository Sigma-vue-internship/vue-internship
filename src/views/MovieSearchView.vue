<template>
  <div>
    <SearchForm :mode="'optional'" @findMovies="findMovies" class="mt-5" />
    <SpinnerLoader :isLoading="isLoading" />
    <ul v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id">
        <SingleMovieSearch v-if="movie.media_type === 'movie'" :movie="movie" />
        <SingleCelebritySearch
          v-else-if="movie.media_type === 'person'"
          :celebrity="movie"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import SingleMovieSearch from "@/components/SingleMovieSearch.vue";
import { mapGetters } from "vuex";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import SingleCelebritySearch from "@/components/SingleCelebritySearch.vue";
export default {
  data() {
    return {
      routeSearchData: null,
    };
  },
  components: {
    SearchForm,
    SingleMovieSearch,
    SpinnerLoader,
    SingleCelebritySearch,
  },
  computed: {
    ...mapGetters({
      movies: "getAllMovies",
      isLoading: "getLoadingStatus",
    }),
  },
  methods: {
    async findMovies(searchData) {
      if (searchData.searchBy) {
        this.$router
          .push({
            name: "search",
            query: {
              searchQuery: searchData.searchQuery,
              searchBy: searchData.searchBy,
              searchByValue: searchData.searchByValue,
            },
          })
          .catch(() => {});
        await this.$store.dispatch("findMovies", searchData);
        return;
      }
      if (searchData.searchQuery) {
        this.$router
          .push({
            path: "/search",
            query: {
              searchQuery: searchData.searchQuery,
            },
          })
          .catch(() => {});
        await this.$store.dispatch("findMovies", searchData);
        return;
      }
    },
  },
  async created() {
    this.routeSearchData = { ...this.$route.query };
    if (this.routeSearchData && !this.movies.length)
      await this.findMovies(this.routeSearchData);
  },
};
</script>
<style lang="scss">
ul {
  padding: 0;
}
</style>