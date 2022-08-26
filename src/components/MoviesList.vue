<template>
  <div>
    <SpinnerLoader :isLoading="isLoading" class="spinner"/>
    <ul class="movies" v-if="movies.length">
      <li
        v-for="(movie) in movies"
        :key="movie.id"
        class="movie"
        @click="routeToMovie(movie.id)"
      >
        <SingleMovieElementList :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SingleMovieElementList from "./SingleMovieElementList";
import SpinnerLoader from "./SpinnerLoader";
export default {
  name: "MoviesList",
  props: {
    movies: Array
  },
  components: { 
    SingleMovieElementList,
    SpinnerLoader
  },
  methods: {
    routeToMovie(id) {
      this.$router.push({ path:`/movie/${id}` });
    }
  },
  computed: {
    ...mapGetters({
      isLoading: "getLoadingStatus"
    })
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
    padding-top: 35px;
  }
  .movie {
    width: 200px;
    margin: 10px;
  }
  .spinner {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
</style>
