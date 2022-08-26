import Vue from "vue";
import Vuex from "vuex";
import celebrity from "./modules/celebrity";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentData: [],
    loadingStatus: false,
  },
  getters: {
    getAllMovies: (state) => state.currentData,
    getLoadingStatus: (state) => state.loadingStatus,
  },
  mutations: {
    SET_CURRENT_DATA(state, movies) {
      state.currentData = [...state.currentData, ...movies];
    },
    SET_LOADING_STATUS_ACTIVE(state) {
      state.loadingStatus = true;
    },
    SET_LOADING_STATUS_INACTIVE(state) {
      state.loadingStatus = false;
    },
    RESET_CURRENT_DATA(state) {
      state.currentData = [];
    },
  },
  actions: {
    async findMovies(
      { commit },
      { searchQuery, searchBy = null, searchByValue = null }
    ) {
      try {
        commit("RESET_CURRENT_DATA");
        if (!searchBy || !searchByValue) {
          commit("SET_LOADING_STATUS_ACTIVE");
          const res = await this.axios.get(`/3/search/multi`, {
            params: { query: searchQuery, page: 1 },
          });
          console.log(res);
          commit("SET_CURRENT_DATA", res.data.results);

          commit("SET_LOADING_STATUS_INACTIVE");
          return;
        }
        commit("SET_LOADING_STATUS_ACTIVE");
        const res = await this.axios.get(`/3/search/multi`, {
          params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
        });
        commit("SET_CURRENT_DATA", res.data.results);
        commit("SET_LOADING_STATUS_INACTIVE");
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: [celebrity],
});
