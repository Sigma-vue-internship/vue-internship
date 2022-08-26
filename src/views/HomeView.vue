<template>
  <div class="px-4 pt-5 my-5 text-center border-bottom">
    <div class="hero__info-container">
      <h1 class="display-4 fw-bold text-light">Moviedesk</h1>
      <p class="lead mb-4 text-light">Watch films online</p>
    </div>
    <div class="col-lg-6 mx-auto">
      <SearchForm :mode="'preview'" @findMovies="findMovies" />
    </div>
    <div class="overflow-hidden" style="max-height: 30vh">
      <div class="container px-5">
        <img
          src="../assets/hero_image.png"
          class="img-fluid rounded-3 shadow-lg mb-4"
          alt="Example image"
          width="700"
          height="500"
          loading="lazy"
        />
      </div>
    </div>
    <MoviesList />
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import MoviesList from "../components/MoviesList";
export default {
  name: "HomeView",
  components: {
    SearchForm,
    MoviesList
  },
  methods: {
    async findMovies(searchData) {
      if (searchData) {
        await this.$store.dispatch("findMovies", searchData);
        this.$router
          .push({
            path: "/search",
            query: {
              searchQuery: searchData.searchQuery,
            },
          })
          .catch(() => {});
        return;
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>