<template>
  <div class="main">
    <div class="main__home">
      <div class="main__caption"> 
        <div class="main__logo">
          <div class="main__name">
            <h1>Moviedesk</h1>
          </div>
          <div class="main__overlay"></div> 
        </div>
        <div class="main__watch">
          <p>Watch films online</p>
          <SearchForm :mode="'preview'" @findMedia="findMedia" class="main__searchForm"/>
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
        const response = await this.$store.dispatch("changeCelebritiesPage", this.celebritiesPage);
        const { data } = response;
        this.celebrities = this.celebrities.concat(data.results);
      } catch (error) {
        console.log(error);
      }
    },
    async changeMoviesPage() {
      try {
        this.moviesPage++;
        const response = await this.$store.dispatch("changeMoviesPage", this.moviesPage);
        const { data } = response;
        this.movies = this.movies.concat(data.results);
      } catch(error) {
        console.log(error);
      }
    }
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
    } catch(error) {
      console.log(error);
    }
  },
}
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
      border-radius: $borderRadius;
      @include flex-center(column);
      flex-wrap: nowrap;
    }
    &__logo {
      background-image: url(../assets/poster.jpg);
      width: 100%;
      height: 350px;
      position: relative;
      @include flex-center(column);
    }
    &__name {
      height: 150px;
      background-color:rgba(122, 63, 224, 0.537);
      width: 100%;
      @include flex-center(column);
      h1 {
        z-index: 3;
        font-size: 60px;
        font-weight: lighter;
        color: white;
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
    }
    &__watch {
      width: 100%;
      height: 200px;
      background-color: $lightPurple;
      p {
        color: white;
        font-size: 25px;
      }
    }
    &__searchForm {
      max-width: 800px;
    }
  }
  @media (max-width: 992px) and (min-width: 376px) {
    .main {
      &__logo {
        height: 250px;
      }
      &__name {
        height: 100px;
        h1 {
          font-size: 40px;
        }
      }
      &__watch {
        p {
          font-size: 20px;
        }
      }
    }
  }
  @media (max-width: 375px) {
    .main {
      &__logo {
        height: 200px;
      }
      &__name {
        height: 70px;
        h1 {
          font-size: 30px;
        }
      }
      &__watch {
        p {
          font-size: 16px;
        }
      }
    }
  }
</style>
