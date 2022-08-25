<template>
    <ul class="movies" v-if="movies.length">
      <li
        v-for="(movie) in movies"
        :key="movie.id"
        class="movie"
        @click="routeToMovie(movie.id)"
      >
        <Movie 
            :movie="movie"
        />
      </li>
    </ul>
    <h1 v-else>In process</h1>
</template>

<script>
import Movie from "./Movie.vue";
export default {
    name: "ListOfPopularMovies",
    props: {
      movies: Array
    },
    components: { 
      Movie
    },
    methods: {
      routeToMovie(id) {
        this.$router.push({ path: `/movie/${id}` });
      },
      changePage(page) {
        this.$store.dispatch("changePage", page);
      }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
  .movies {
    width: 1100px;
    @include flex-center(row);
    padding: 0;
    list-style-type: none; 
    margin-top: 10px;
  }
  .movie {
    width: 200px;
    margin: 10px;
  }
</style>
