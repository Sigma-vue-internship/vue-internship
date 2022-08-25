<template>
  <div>
    <SearchForm :mode="'optional'" @findMovies="findMovies" class="m-4 mt-5" />
    <SpinnerLoader :isLoading="isLoading" />
    <ul v-if="movies.length">
      <li v-for="movie in movies" :key="movie.id" class="container">
        <b-card
          :img-src="
            movie.poster_path
              ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
              : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
          "
          img-alt="Card image"
          img-width="185"
          img-left
          class="mb-3"
        >
          <b-card-title>{{ movie.title }}</b-card-title>
          <b-card-text>
            {{ movie.overview }}
          </b-card-text>
          <div class="offset-lg-10 offset-md-9 offset-sm-0">
            <b-button
              variant="outline-primary"
              @click="redirectToMovie(movie.id)"
              size="md"
              >Details</b-button
            >
          </div>
        </b-card>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import { mapGetters } from "vuex";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
export default {
  data() {
    return {
      routeSearchData: null,
    };
  },
  components: {
    SearchForm,
    SpinnerLoader,
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
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
  async created() {
    this.routeSearchData = { ...this.$route.query };
    if (this.routeSearchData && !this.movies.length)
      await this.findMovies(this.routeSearchData);
  },
};
</script>