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
    user: {
      sessionToken: "",
    },

    movies: [],
    celebrities: [],
  },
  getters: {
    getUserSessionToken: (state) => state.sessionToken,

    lastThreeMovies: (state) => state.movies.slice(0, 3),
    lastThreeCelebrities: (state) => state.celebrities.slice(0, 3),
    cashedMovies: (state) => state.movies,
    cashedCelebrities: (state) => state.celebrities,
  },
  mutations: {
    SET_USER_SESSION_TOKEN: (state, token) => (state.user.sessionToken = token),

    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
    SET_CELEBRITIES(state, celebrities) {
      state.celebrities = celebrities;
    },
  },
  actions: {
    async getRequestToken() {
      return this.axios.get("/authentication/token/new");
    },
    async createSessionToken(
      { commit },
      { username, password, request_token }
    ) {
      try {
        const sessionTokenRes = this.axios.post(
          "/authentication/token/validate_with_login", {
            username,
            password,
            request_token,
          }
        );
        commit("SET_USER_SESSION_TOKEN", sessionTokenRes.data.session_token);
      } catch (e) {
        console.log(e);
      }
    },
    async findMedia(_, { searchQuery, searchBy = null, searchByValue = null }) {
      if (!searchBy || !searchByValue) {
        return this.axios.get(`search/multi`, {
          params: { query: searchQuery, page: 1 },
        });
      }
      return this.axios.get(`search/multi`, {
        params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
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
        console.error(error);
      }
    },
  },
});
