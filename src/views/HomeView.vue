<template>
  <div class="main">
    <div class="text-white">
      <div class="main__top">
        <div class="main__name text-center py-3">
          <h1>Moviedesk</h1>
        </div>
        <div class="main__overlay"></div>
      </div>
      <div class="text-center">
        <div class="main__watch py-4">
          <h4>Find movie or actor info</h4>
          <SearchForm
              :mode="'preview'"
              @findMedia="findMedia"
              class="main__searchForm"
          />
        </div>
      </div>
    </div>
    <section class="px-2 text-center container">
      <MediaList
          title="Popular actors"
          route="/celebrity/"
          :elements="celebrities"
          :changePage="() => { return changeCurrentPage('celebrities')}"
          class="pt-3"
      />
      <MediaList
          title="Popular movies"
          route="/movie/"
          :elements="movies"
          :changePage="() => { return changeCurrentPage('movies')}"
      />
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SearchForm from "@/components/common/SearchForm";
import MediaList from "@/components/media/MediaList";
export default {
  name: "HomeView",
  components: {
    SearchForm,
    MediaList
  },
  data() {
    return {
      celebrities: [],
      celebritiesPage: 1,
      movies: [],
      moviesPage: 1
    }
  },
  methods: {
    ...mapActions([
      "changeMediaPage",
      "getMedia"
    ]),
    async findMedia(searchData) {
      if (searchData) {
        this.$router.push({
          path: "/search",
          query: {
            searchQuery: searchData.searchQuery,
          },
        })
      }
    },
    async changeCurrentPage(type) {
      try {
        if(type === "celebrities") {
          this.celebritiesPage++;
          const obj = { type:type, page:this.celebritiesPage }
          const response = await this.changeMediaPage(obj);
          const { data } = response;
          this.celebrities = this.celebrities.concat(data.results);
        } else if(type === "movies") {
          this.moviesPage++;
          const obj = { type:type, page:this.celebritiesPage }
          const response = await this.changeMediaPage(obj);
          const { data } = response;
          this.movies = this.movies.concat(data.results);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      const response = await this.getMedia("celebrities");
      const { data } = response;
      this.celebrities = data.results;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await this.getMedia("movies");
      const { data } = response;
      this.movies = data.results;
    } catch(error) {
      console.log(error);
    }
  },
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
.main {
  &__top {
    background-image: url(../assets/poster.jpg);
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    padding-top: 6rem;
    padding-bottom: 6rem;
    position: relative;
  }
  &__name {
    background-color:rgba(122, 63, 224, 0.537);
    h1 {
      position: relative;
      z-index: 3;
    }
  }
  &__overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    opacity: 0.5;
    z-index: 1;
  }
  &__watch {
    background-color: $lightPurple;
  }
  &__searchForm {
    max-width: 800px;
  }
}
</style>
