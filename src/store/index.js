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
    movies: [],
    celebrities: [],
    topMovies: [],
    moviesNowPlaying: [],
  },
  getters: {
    getUserSessionToken: (state) => state.sessionToken,

    cashedTopMovies: (state) => state.topMovies,
    cashedMoviesNowPlaying: (state) => state.moviesNowPlaying,
    cashedMovies: (state) => state.movies,
    cashedCelebrities: (state) => state.celebrities,
  },
  mutations: {
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
    async getRequestToken() {
      try{
        const { data } = await this.axios.get("/authentication/token/new");
        return data.request_token;
      }catch(e){
        console.log(e);
      }
    },
    async getAuthorizedToken(
      _,
      { username, password, requestToken }
    ) {
      try {
        const { data } = await this.axios.post(
          "/authentication/token/validate_with_login", {
            username,
            password,
            requestToken,
          }
        );
        return data.session_id;
      } catch (e) {
        console.log(e);
      }
    },
    async getSessionToken(_,authToken) {
      const { data } = await this.axios.post(
        "/authentication/session/new", {
          authToken,
        }
      );
      return data.session_id;
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
    async getMoviesTopRated({ commit }) {
      try {
        const response = await this.axios.get("movie/top_rated");
        const {
          data: { results },
        } = response;
        commit("SET_TOP_MOVIES", results);
        return results.slice(0, 3);
      } catch (error) {
        console.error(error);
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
    async getMovieActors(_, movieId) {
      try {
        return await this.axios.get(`movie/${movieId}/credits`);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
