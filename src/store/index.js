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
        return this.axios.get(`/3/search/multi`, {
          params: { query: searchQuery, page: 1 },
        });
      }
      return this.axios.get(`/3/search/multi`, {
        params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
      });
    },
    async loadMoreMedia(
      context,
      { searchQuery, searchBy = null, searchByValue = null, page }
    ) {
      if (!searchBy || !searchByValue) {
        return this.axios.get(`/3/search/multi`, {
          params: { query: searchQuery, page },
        });
      }
      return this.axios.get(`/3/search/multi`, {
        params: { query: searchQuery, [searchBy]: searchByValue, page },
      });
    },
    async findSingleCelebrity(context, celebrityId) {
      return this.axios.get(`/3/person/${celebrityId}`);
    },

    async getCelebrities() {
      const options = {
        params: {
          page: 1,
        },
      };
      try {
        return await this.axios.get("/3/person/popular", options);
      } catch (error) {
        console.error(error);
      }
    },
    async getCelebrityMovies(_, celebrityId) {
      const options = {
        params: {
          page: 1,
        },
      };
      try {
        return await this.axios.get(
          `/3/person/${celebrityId}/movie_credits`,
          options
        );
      } catch (error) {
        console.error(error);
      }
    },
    async changeCelebritiesPage(_, newPage) {
      const options = {
        params: {
          page: newPage,
        },
      };
      try {
        return await this.axios.get("/3/person/popular", options);
      } catch (error) {
        console.error(error);
      }
    },
    async getCelebrityImages(_, celebrityId) {
      return this.axios.get(`/3/person/${celebrityId}/images`);
    },
    async getMovieImages(_, movieId) {
      return this.axios.get(`/3/movie/${movieId}/images`);
    },
    async getMovies() {
      const options = {
        params: {
          page: 1,
        },
      };
      try {
        return await this.axios.get("/3/movie/popular", options);
      } catch (error) {
        console.error(error);
      }
    },
    async changeMoviesPage(_, newPage) {
      const options = {
        params: {
          page: newPage,
        },
      };
      try {
        return await this.axios.get("/3/movie/popular", options);
      } catch (error) {
        console.error(error);
      }
    },
    async getMovie(_, id) {
      try {
        return await this.axios.get(`/3/movie/${id}`);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
