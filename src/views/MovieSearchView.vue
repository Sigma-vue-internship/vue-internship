<template>
  <div>
    <SearchForm :mode="'optional'" @findMovies="findMovies" class="m-4 mt-5" />
    <ul>
      <li v-for="movie in movies[0]" :key="movie.id" class="container">
        <b-card
          :img-src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
          img-alt="Card image"
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
export default {
  components: {
    SearchForm,
  },
  computed: {
    movies() {
      return this.$store.getters.getAllMovies;
    },
  },
  methods: {
    findMovies(searchData) {
      this.$store.dispatch("findMovies", searchData);
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>