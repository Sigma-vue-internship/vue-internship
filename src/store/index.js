import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allMovies: [],
    currentMovies: [],
    loadingStatus: false,
  },
  getters: {
    getAllMovies: (state) => state.currentMovies,
    getLoadingStatus: (state) => state.loadingStatus,
    getMovies: state => state.allMovies,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies;
    },
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
    async setMovies({ commit }) {
      const res = await this.axios.get("/3/movie/popular", {
        params: {
          page: 1
        }
      });
      commit("SET_MOVIES", res.data.results);
    },
    async changePage({ commit }, newPage) {
      commit("SET_LOADING_STATUS_ACTIVE");
      const res = await this.axios.get("/3/movie/popular", {
        params: {
          page: newPage
        }
      });
      commit("SET_MOVIES", res.data.results);
      commit("SET_LOADING_STATUS_INACTIVE");
    }
  }
})
