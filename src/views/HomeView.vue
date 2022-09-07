<template>
  <div class="main pb-4">
    <div class="text-white">
      <div class="main__top">
        <div class="main__name text-center py-3">
          <h1>Moviedesk</h1>
        </div>
        <div class="main__overlay" />
      </div>
      <div class="text-center">
        <div class="main__watch py-3">
          <h4>Find movie or actor info</h4>
          <SearchForm
            :mode="'preview'"
            class="main__searchForm"
            @findMedia="findMedia"
          />
        </div>
      </div>
    </div>
    <section class="px-2 text-center container">
      <MediaList
        title="Popular movies"
        route="/movie/"
        :elements="movies"
        :change-page="
          () => {
            return changeCurrentPage('movies');
          }
        "
      />
      <MediaList
        title="Popular actors"
        route="/celebrity/"
        :elements="celebrities"
        :change-page="
          () => {
            return changeCurrentPage('celebrities');
          }
        "
        class="pb-4"
      />
    </section>
    <div class="main__bg" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchForm from "../components/common/SearchForm";
import MediaList from "../components/media/MediaList";
export default {
  name: "HomeView",
  components: {
    SearchForm,
    MediaList,
  },
  data() {
    return {
      celebrities: [],
      celebritiesPage: 1,
      movies: [],
      moviesPage: 1,
    };
  },
  computed: {
    ...mapGetters(["cashedMovies", "cashedCelebrities"]),
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions(["changeMediaPage", "getMovies", "getActors"]),
    async loadData() {
      this.movies = this.cashedMovies.length ? this.cashedMovies : await this.getMovies();
      this.celebrities = this.cashedCelebrities.length ? this.cashedCelebrities : await this.getActors();
    },
    async findMedia(searchData) {
      if (searchData) {
        const { searchQuery } = searchData;
        this.$router.push({
          path: "/search",
          query: {
            searchQuery,
          },
        });
      }
    },
    async changeCurrentPage(type) {
      try {
        this[`${type}Page`]++;
        const obj = { type, page: this[`${type}Page`] };
        const response = await this.changeMediaPage(obj);
        const { data } = response;
        this[type] = this[type].concat(data.results);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
.main {
  background-image: linear-gradient(
    110.1deg,
    rgba(30, 2, 83, 1) 44.2%,
    rgba(198, 55, 160, 1) 138.2%
  );

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
    background-color: rgba(122, 63, 224, 0.537);
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
    -webkit-box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);
    -moz-box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);
    box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);
  }
  &__searchForm {
    max-width: 800px;
  }
}
</style>
