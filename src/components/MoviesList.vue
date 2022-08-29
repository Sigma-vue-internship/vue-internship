<template>
  <div class="moviesList">
    <SpinnerLoader :isLoading="isLoading" v-if="isLoading" />
    <ul class="movies" v-else >
      <SingleMovieElementList
        :movie="movie"
        v-for="(movie) in movies"
        :key="movie.id"
        class="movie"
        @click.native="routeToMovie(movie.id)"
      />
    </ul>
    <PaginationWrapper @changePage="changePage" :totalRows=totalRows />
  </div>
</template>

<script>
import SingleMovieElementList from "./SingleMovieElementList";
import PaginationWrapper from "../components/PaginationWrapper";
import SpinnerLoader from "./SpinnerLoader";
export default {
  name: "MoviesList",
  data() {
    return {
      movies: [],
      totalRows: 1000,
      isLoading: false
    }
  },
  components: {
    SingleMovieElementList,
    PaginationWrapper,
    SpinnerLoader
  },
  methods: {
    routeToMovie(id) {
      this.$router.push({ path: `/movie/${id}` });
    },
    async changePage(page) {
      try {
        this.isLoading = true;
        const response = await this.$store.dispatch("changePage", page);
        const { data } = response;
        this.movies = data.results;
        this.isLoading = false;
      } catch(error) {
        this.isLoading = false;
        console.log(error);
      }
    }
  },
  async created() {
    try {
      const response = await this.$store.dispatch("getMovies");
      const { data } = response;
      this.movies = data.results;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
  .moviesList {
    background-color: rgb(34, 34, 34);
    @include flex-center(column);
    margin-top: 72px;
    position: relative;
    height: 100%;
  }
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
</style>
