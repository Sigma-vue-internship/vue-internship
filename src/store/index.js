import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: false,
  },
  getters: {
    getLoadingStatus: (state) => state.loadingStatus,
  },
  mutations: {
    SET_LOADING_STATUS_ACTIVE(state) {
      state.loadingStatus = true;
    },
    SET_LOADING_STATUS_INACTIVE(state) {
      state.loadingStatus = false;
    },
  },
  actions: {
    async findMedia(
      { commit },
      { searchQuery, searchBy = null, searchByValue = null }
    ) {
      try {
        if (!searchBy || !searchByValue) {
          commit("SET_LOADING_STATUS_ACTIVE");
          const res = await this.axios.get(`/3/search/multi`, {
            params: { query: searchQuery, page: 1 },
          });
          commit("SET_LOADING_STATUS_INACTIVE");

          return res.data.results;
        }
        commit("SET_LOADING_STATUS_ACTIVE");
        const res = await this.axios.get(`/3/search/multi`, {
          params: { query: searchQuery, [searchBy]: searchByValue, page: 1 },
        });
        commit("SET_LOADING_STATUS_INACTIVE");

        return res.data.results;
      } catch (e) {
        console.log(e);
      }
    },
    async findSingleCelebrity({ commit }, celebrityId) {
      commit("SET_LOADING_STATUS_ACTIVE");

      const res = await this.axios.get(`/3/person/${celebrityId}`);

      commit("SET_LOADING_STATUS_INACTIVE");

      return res.data;
    },
  },
});
