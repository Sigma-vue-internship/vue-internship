<template>
  <footer class="pt-5 px-5">
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-2 mb-3">
          <h5>Top movies</h5>
          <ul class="nav flex-column">
            <li
              v-for="movie in topMovies"
              :key="movie.uuid"
              class="nav-item mb-2"
            >
              <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                {{ movie.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-2 mb-3">
          <h5>Now playing</h5>
          <ul class="nav flex-column">
            <li
              v-for="movie in moviesNowPlaying"
              :key="movie.uuid"
              class="nav-item mb-2"
            >
              <router-link :to="{ name: 'movie', params: { id: movie.id } }">
                {{ movie.title }}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md-2 mb-3">
          <h5>Navigation</h5>
          <ul class="nav flex-column">
            <li class="nav-item mb-2">
              <router-link to="/">
                Home
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/search">
                Search
              </router-link>
            </li>
            <li class="nav-item mb-2">
              <router-link to="/login">
                Login
              </router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-5 offset-md-1 mb-3">
          <form>
            <h5>Find movie or actor info</h5>
            <SearchForm
              :mode="'preview'"
              class="searchForm"
              @findMedia="findMedia"
            />
          </form>
        </div>
      </div>
      <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© 2022 Sigma, Inc. All rights reserved.</p>
        <ul class="list-unstyled d-flex">
          <li>
            <a
              href="https://www.facebook.com/SIGMASOFTWAREGROUP"
              class="bi icon-facebook icons"
            />
          </li>
          <li class="ms-3">
            <a
              href="https://www.youtube.com/user/SigmaUkraine"
              class="bi icon-youtube icons"
            />
          </li>
          <li class="ms-3">
            <a
              href="https://www.instagram.com/sigma_software/"
              class="bi icon-instagram icons"
            />
          </li>
          <li class="ms-3">
            <a
              href="https://www.linkedin.com/company/sigma-software-group/"
              class="bi icon-linkedin icons"
            />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchForm from "@/components/common/SearchForm";
export default {
  name: "Footer",
  components: {
    SearchForm,
  },
  data() {
    return {
      topMovies: [],
      moviesNowPlaying: [],
    };
  },
  computed: {
    ...mapGetters(["cashedTopMovies", "cashedMoviesNowPlaying"]),
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions(["getMoviesTopRated", "getMoviesNowPlaying"]),
    async loadData() {
      this.topMovies = this.cashedTopMovies.length ? this.cashedTopMovies : await this.getMoviesTopRated();
      this.moviesNowPlaying = this.cashedMoviesNowPlaying.length ? this.cashedMoviesNowPlaying : await this.getMoviesNowPlaying();
    },
    async findMedia(searchData) {
      if (searchData) {
        this.$router.push({
          path: "/search",
          query: {
            searchQuery: searchData.searchQuery,
          },
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";
    footer {
      min-width: 100%;
      background-color: $darkPurple;
      .icons {
        color: #513f7a;
        font-size: 25px;
        text-decoration: none;

        &:hover {
          color: #9f8fc3;
        }
      }
      h5 {
        color: white;
      }
      p {
        color: rgb(184, 184, 184);
      }
      .searchForm {
        background-color: transparent;
        padding: 0;
      }
      .border-top {
        border-top-color: #4c3e6b !important;
      }
      a {
        text-decoration: none;
        color: rgb(111, 111, 111);
        &:hover {
          color: #9f8fc3;
        }
      }
    }
</style>
