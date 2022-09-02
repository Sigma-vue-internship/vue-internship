import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async findMedia(
      context,
      { searchQuery, searchBy = null, searchByValue = null }
    ) {
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
      context,
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
    async findSingleCelebrity(context, celebrityId) {
      return this.axios.get(`person/${celebrityId}`);
    },
    async getCelebrityMovies(_, celebrityId) {
      const options = {
        params: {
          page: 1,
        },
      };
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
    async changeMediaPage(_, obj) {
      const options = {
        params: {
          page: obj.page,
        },
      };
      try {
        if(obj.type === "celebrities") {
          return await this.axios.get("person/popular", options);
        } else if(obj.type === "movies") {
          return await this.axios.get("movie/popular", options);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getMedia(_, type) {
      const options = {
        params: {
          page: 1,
        },
      };
      try {
        if(type === "movies") {
          return await this.axios.get("movie/popular", options);
        } else if(type === "celebrities") {
          return await this.axios.get("person/popular", options);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
