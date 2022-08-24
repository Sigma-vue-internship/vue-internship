<template>
  <div class="home">
    <ul class="movies" v-if="movies.length">
      <li
        v-for="(movie) in movies"
        :key="movie.id"
        class="movie"
        @click="routeToMovie(movie.id)"
      >
        <b-card
          :img-src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
          :img-alt="'Card image '+movie.id"
          img-height="290px"
          img-top
        >
          <b-card-text text-muted>{{ movie.title }}</b-card-text>
        </b-card>
      </li>
      <Pagination
        :limit="limit"
        :totalPages="totalPages"
        @changePage="changePage"
      />
    </ul>
    <h1 v-else>In process</h1>
  </div>
</template>

<script>
import Pagination from "../components/Pagination.vue";
export default {
  name: "HomeView",
  components: { 
    Pagination
  },
  data() {
    return {
      page: 1,
      limit: 20,
      totalPages: 0
    }
  },
  async created() {
    const res = await this.axios.get("https://api.themoviedb.org/3/movie/popular", {
      params: {
        page: this.page
      }
    });
    this.totalPages = res.data.total_pages;
    this.$store.dispatch("setMovies", res.data.results);
  },
  methods: {
    async changePage(currentPage) {
      this.page = currentPage;
      const res = await this.axios.get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          page: this.page
        }
      });
      this.totalPages = res.data.total_pages;
      this.$store.dispatch("setMovies", res.data.results);  
    },
    routeToMovie(id) {
      this.$router.push({ path:`/movie/${id}` });
    }
  },
  computed: {
    movies() {
      return this.$store.getters.getMovies;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
  .home {
    background-color: rgb(34, 34, 34);
    @include flex-center(row);
    margin-top: 72px;
  }
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
  .card-body {
    @include flex-center(column);
    height: 80px;
  }
  p {
    overflow: hidden;
  }
</style>