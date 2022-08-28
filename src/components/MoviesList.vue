<template>
  <div class="moviesList">
    <SpinnerLoader :isLoading="isLoading" v-if="isLoading"/>
    <div v-else>
      <ul class="movies" v-if="movies.length" >
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
        this.movies = await this.$store.dispatch("changePage", page);
        this.isLoading = false;
      } catch(error) {
        this.isLoading = false;
        console.log(error);
      }
    }
  },
  async created() {
    try {
      this.movies = await this.$store.dispatch("getMovies");
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
