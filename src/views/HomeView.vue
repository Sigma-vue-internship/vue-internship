<template>
  <div class="main">
    <div class="main__home">
      <div class="main__caption">
        <div class="main__logo">
          <div class="main__name">
            <h1>Moviedesk</h1>
          </div>
        </div>
        <div class="main__watch">
          <p>Watch films online</p>
          <SearchForm :mode="'preview'" @findMedia="findMedia" />
        </div>
      </div>
      <MediaList
        title="Popular actors"
        route="/celebrity/"
        :elements="celebrities"
        :changePage="changeCelebritiesPage"
      />
      <MediaList
        title="Popular movies"
        route="/movie/"
        :elements="movies"
        :changePage="changeMoviesPage"
      />
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm";
import MediaList from "@/components/MediaList";
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
  methods: {
    async findMedia(searchData) {
      if (searchData) {
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
    },
    async changeCelebritiesPage() {
      try {
        this.celebritiesPage++;
        const response = await this.$store.dispatch(
          "changeCelebritiesPage",
          this.celebritiesPage
        );
        const { data } = response;
        this.celebrities = this.celebrities.concat(data.results);
      } catch (error) {
        console.log(error);
      }
    },
    async changeMoviesPage() {
      try {
        this.moviesPage++;
        const response = await this.$store.dispatch(
          "changeMoviesPage",
          this.moviesPage
        );
        const { data } = response;
        this.movies = this.movies.concat(data.results);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    try {
      const response = await this.$store.dispatch("getCelebrities");
      const { data } = response;
      this.celebrities = data.results;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await this.$store.dispatch("getMovies");
      const { data } = response;
      this.movies = data.results;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
.main {
  @include flex-center(column);
  text-align: center;
  &__home {
    width: 100%;
  }
  &__caption {
    height: 950px;
    border-radius: $borderRadius;
    @include flex-center(column);
    flex-wrap: nowrap;
  }
  &__logo {
    margin-top: 25px;
    background-image: url(../assets/hero_image.png);
    width: 100%;
    height: 750px;
    @include flex-center(column);
    border-top-left-radius: $borderRadius;
    border-top-right-radius: $borderRadius;
  }
  &__name {
    height: 200px;
    background-color: rgba(122, 63, 224, 0.537);
    width: 100%;
    @include flex-center(column);
    h1 {
      font-size: 70px;
      font-weight: lighter;
      color: white;
    }
  }
  &__watch {
    width: 1100px;
    height: 240px;
    border-bottom-left-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
    background-color: $lightPurple;
    p {
      color: white;
      padding-top: 30px;
      font-size: 30px;
    }
  }
}
@media (max-width: 992px) and (min-width: 376px) {
  .main {
    &__home {
      width: 100%;
    }
    &__caption {
      height: 650px;
    }
    &__logo {
      height: 450px;
    }
    &__name {
      height: 150px;
      h1 {
        font-size: 50px;
      }
    }
    &__watch {
      margin-top: 45px;
      width: 100%;
      p {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 375px) {
  .main {
    &__home {
      width: 100%;
    }
    &__caption {
      height: 450px;
    }
    &__logo {
      height: 250px;
    }
    &__name {
      height: 100px;
      h1 {
        font-size: 35px;
      }
    }
    &__watch {
      margin-top: 10px;
      width: 100%;
      p {
        font-size: 16px;
      }
    }
  }
}
</style>
