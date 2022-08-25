<template>
  <div>
    <SearchForm :mode="'optional'" @findMovies="findMovies" class="m-4 mt-5" />
    <Loading :isLoading="isLoading" />
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
import Loading from "@/components/Loading.vue";
export default {
  components: {
    SearchForm,
    Loading,
  },
  computed: {
    ...mapGetters({
      movies: "getAllMovies",
      isLoading: "getLoadingStatus",
    }),
  },
  methods: {
    async findMovies(searchData) {
      await this.$store.dispatch("findMovies", searchData);
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>