import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const options = {
  params: {
    page: 1,
  },
};

export default new Vuex.Store({
  state: {
    user:{
      auth: false,
      watchlist:[],
    },
    movies: [],
    celebrities: [],
    topMovies: [],
    moviesNowPlaying: [],
  },
  getters: {
    getUserAuth: (state) => state.user.auth,
    getUserWatchlist: (state) => state.user.watchlist,
    getSessionToken: () => localStorage.getItem("sessionToken"),

    cashedTopMovies: (state) => state.topMovies,
    cashedMoviesNowPlaying: (state) => state.moviesNowPlaying,
    cashedMovies: (state) => state.movies,
    cashedCelebrities: (state) => state.celebrities,
  },
  mutations: {
    SET_USER_AUTH(state, isAuth) {
      state.user.auth = isAuth;
    },
    SET_USER_WATCHLIST(state, movies) {
      state.user.watchlist = movies;
    },
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_CELEBRITIES(state, celebrities) {
      state.celebrities = celebrities;
    },
    SET_TOP_MOVIES(state, movies) {
      state.topMovies = movies;
    },
    SET_MOVIES_NOW_PLAYING(state, movies) {
      state.moviesNowPlaying = movies;
    },
  },
  actions: {
    setUserWatchlist({ commit }, movies) {
      commit("SET_USER_WATCHLIST", movies);
    },
    async getUserList(_, { session_id, account_id, list_type }) {
      return this.axios.get(`/account/${account_id}/${list_type}/movies`, { params: { session_id } });
    },
    async sendToList(_, { media_type, media_id, session_id, account_id, list_type }) {
      return this.axios.post(`/account/${account_id}/${list_type}`,{
        media_type,
        media_id,
        [list_type]: true,
      }, { params:{ session_id } });
    },
    async getUserAccountDetails(_, session_id) {
      if (session_id) {
        return this.axios.get("/account", { params: { session_id } });

      }
    },
    async checkIsUserLogged({ commit, getters }) {
      if(getters.getSessionToken){
        commit("SET_USER_AUTH", true);
        return;
      }
      commit("SET_USER_AUTH", false);
    },
    async getRegions() {
      return this.axios.get("/watch/providers/regions");
    },
    async getRequestToken() {
      try {
        const { data } = await this.axios.get("/authentication/token/new");
        return data.request_token;
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getAuthorizedToken(_, { username, password, requestToken }) {
      try {
        const { data } = await this.axios.post(
          "/authentication/token/validate_with_login",
          {
            username,
            password,
            request_token: requestToken,
          }
        );
        return data.request_token;
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getSessionToken(_, authToken) {
      const { data } = await this.axios.post("/authentication/session/new", {
        request_token: authToken,
      });
      return data.session_id;
    },
    async findMedia(_, { searchQuery, searchBy = null, searchByValue = null }) {
      if (!searchBy || !searchByValue) {
        return this.axios.get(`search/multi`, {
          params: { query: searchQuery, page: 1 },
        });
      }
      return this.axios.get(`search/multi`, {
        params: { query: searchQuery, page: 1, [searchBy]: searchByValue },
      });
    },
    async loadMoreMedia(
      _,
      { searchQuery, searchBy = null, searchByValue = null, page }
    ) {
      if (!searchBy || !searchByValue) {
        return this.axios.get(`search/multi`, {
          params: { query: searchQuery, page },
        });
      }
      return this.axios.get(`search/multi`, {
        params: { query: searchQuery, [searchBy]: searchByValue, page },
      });
    },
    async findSingleCelebrity(_, celebrityId) {
      return this.axios.get(`person/${celebrityId}`);
    },
    async getCelebrityMovies(_, celebrityId) {
      try {
        return await this.axios.get(
          `person/${celebrityId}/movie_credits`,
          options
        );
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getCelebrityImages(_, celebrityId) {
      return this.axios.get(`person/${celebrityId}/images`);
    },
    async getMovieImages(_, movieId) {
      return this.axios.get(`movie/${movieId}/images`);
    },
    async getMovie(_, id) {
      try {
        return await this.axios.get(`movie/${id}`);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getMovies({ commit }) {
      try {
        const response = await this.axios.get("movie/popular", options);
        const {
          data: { results },
        } = response;
        commit("SET_MOVIES", results);
        return results;
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getMoviesTopRated({ commit }) {
      try {
        const response = await this.axios.get("movie/top_rated");
        const {
          data: { results },
        } = response;
        commit("SET_TOP_MOVIES", results);
        return results.slice(0, 3);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getMoviesNowPlaying({ commit }) {
      try {
        const response = await this.axios.get("movie/now_playing");
        const {
          data: { results },
        } = response;
        commit("SET_MOVIES_NOW_PLAYING", results);
        return results.slice(0, 3);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getActors({ commit }) {
      try {
        const response = await this.axios.get("person/popular", options);
        const {
          data: { results },
        } = response;
        commit("SET_CELEBRITIES", results);
        return results;
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async changeMediaPage(_, obj) {
      const options = {
        params: {
          page: obj.page,
        },
      };
      try {
        if (obj.type === "celebrities") {
          return await this.axios.get("person/popular", options);
        } else if (obj.type === "movies") {
          return await this.axios.get("movie/popular", options);
        }
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getMovieActors(_, movieId) {
      try {
        return await this.axios.get(`movie/${movieId}/credits`);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async getMovieReviews(_, movieId) {
      try {
        return await this.axios.get(`movie/${movieId}/reviews`);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
    async changeMovieReviewsPage(_, obj) {
      const options = {
        params: {
          page: obj.page,
        },
      };
      try {
        return await this.axios.get(`movie/${obj.id}/reviews`, options);
      } catch (error) {
        this.$notify({
          group: "error",
          type: "error",
          title: "Error message",
          text: error.message,
        });
      }
    },
  },
});
