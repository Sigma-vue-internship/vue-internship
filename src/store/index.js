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
    async getMovies() {
      try {
        const res = await this.axios.get("/3/movie/popular", {
          params: {
            page: 1,
          },
        });
        return res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async changePage(_, newPage) {
      try {
        const res = await this.axios.get("/3/movie/popular", {
          params: {
            page: newPage,
          },
        });
        return res.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    async getMovie(_, id) {
      const res = await this.axios.get(`/3/movie/${id}`);
      return res.data;
    },
  },
});
