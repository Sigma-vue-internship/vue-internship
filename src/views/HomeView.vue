<template>
  <div class="home">
    <ListOfPopularMovies v-if="getMovies" :movies=getMovies />
    <Pagination @changePage="changePage" :totalPages=getPages />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from "../components/Pagination.vue";
import ListOfPopularMovies from "../components/ListOfPopularMovies.vue";
export default {
  name: "HomeView",
  components: {
    Pagination,
    ListOfPopularMovies
  },
  methods: {
    ...mapActions(["setMovies"]),
    routeToMovie(id) {
      this.$router.push({ path:`/movie/${id}` });
    },
    changePage(page) {
      this.$store.dispatch("changePage", page);
    },
  },
  mounted() {
    this.setMovies();
  },
  computed: {
    ...mapGetters(["getMovies", "getPages"]),
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
  .home {
    background-color: rgb(34, 34, 34);
    @include flex-center(column);
    margin-top: 72px;
  }
</style>