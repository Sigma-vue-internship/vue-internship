import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentMovies: [],
  },
  getters: {
    getAllMovies: (state) => state.currentMovies,
  },
  mutations: {
    SET_CURRENT_MOVIES(state, movies) {
      state.currentMovies = [...state.currentMovies, movies];
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
          const res = await this.axios.get(`/3/search/movie`, {
            params: { query: searchQuery, page: 1 },
          });
          commit("SET_CURRENT_MOVIES", res.data.results);
          return;
        }
        const res = await this.axios.get(`/3/search/movie`, {
          params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
        });
        commit("SET_CURRENT_MOVIES", res.data.results);
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {},
});
