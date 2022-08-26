import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMovies: [],
    loadingStatus: false,
  },
  getters: {
    getAllMovies: (state) => state.currentMovies,
    getLoadingStatus: (state) => state.loadingStatus,
  },
  mutations: {
    SET_CURRENT_MOVIES(state, movies) {
      state.currentMovies = [...state.currentMovies, ...movies];
    },
    SET_LOADING_STATUS_ACTIVE(state) {
      state.loadingStatus = true;
    },
    SET_LOADING_STATUS_INACTIVE(state) {
      state.loadingStatus = false;
    },
    RESET_CURRENT_MOVIES(state) {
      state.currentMovies = [];
    },
  },
  actions: {
    async findMovies(
      { commit },
      { searchQuery, searchBy = null, searchByValue = null }
    ) {
      try {
        commit("RESET_CURRENT_MOVIES");
        if (!searchBy || !searchByValue) {
          commit("SET_LOADING_STATUS_ACTIVE");
          const res = await this.axios.get(`/3/search/movie`, {
            params: { query: searchQuery, page: 1 },
          });
          commit("SET_CURRENT_MOVIES", res.data.results);

          commit("SET_LOADING_STATUS_INACTIVE");
          return;
        }
        commit("SET_LOADING_STATUS_ACTIVE");
        const res = await this.axios.get(`/3/search/movie`, {
          params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
        });
        commit("SET_CURRENT_MOVIES", res.data.results);
        commit("SET_LOADING_STATUS_INACTIVE");
      } catch (e) {
        console.log(e);
      }
    },
    async getMovies() {
      try {
        const res = await this.axios.get("/3/movie/popular", {
          params: {
            page: 1
          }
        });
        return res.data.results;
      } catch(error) {
        console.log(error);
      }
    },
    async changePage(_, newPage) {
      try {
        const res = await this.axios.get("/3/movie/popular", {
          params: {
            page: newPage
          }
        });
        return res.data.results;
      } catch(error) {
        console.log(error);
      }
    },
    async getMovie(_, id) {
      const res = await this.axios.get(`/3/movie/${id}`);
      console.log(res.data)
      return res.data;
    }
  }
})
