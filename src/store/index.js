import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // loadingStatus: false,
  },
  getters: {
    // getLoadingStatus: (state) => state.loadingStatus,
  },
  mutations: {
    // SET_LOADING_STATUS_ACTIVE(state) {
    //   state.loadingStatus = true;
    // },
    // SET_LOADING_STATUS_INACTIVE(state) {
    //   state.loadingStatus = false;
    // },
  },
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
    async findSingleCelebrity(context, celebrityId) {
      return this.axios.get(`/3/person/${celebrityId}`);
    },
    async getMovies() {
      const options = {
        params: {
          page: 1
        }
      };
      try {
        return await this.axios.get("/3/movie/popular", options);
      } catch (error) {
        console.error(error);
      }
    },
    async changePage(_, newPage) {
      const options = {
        params: {
          page: newPage
        }
      };
      try {
        return await this.axios.get("/3/movie/popular", options)
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
    }
  }
})
