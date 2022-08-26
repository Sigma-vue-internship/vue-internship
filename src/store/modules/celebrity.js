export default {
  state: {
    currentCelebrity: {},
    loadingStatus: false,
  },
  getters: {
    getCurrentCelebrity: (state) => state.currentCelebrity,
  },
  mutations: {
    SET_CURRENT_CELEBRITY(state, celebrity) {
      state.currentCelebrity = { ...celebrity };
    },
    RESET_CURRENT_CELEBRITY(state) {
      state.currentCelebrity = {};
    },
    SET_LOADING_STATUS_ACTIVE(state) {
      state.loadingStatus = true;
    },
    SET_LOADING_STATUS_INACTIVE(state) {
      state.loadingStatus = false;
    },
  },
  actions: {
    async findSingleCelebrity({ commit }, celebrityId) {
      try {
        commit("SET_LOADING_STATUS_ACTIVE");
        commit("RESET_CURRENT_CELEBRITY");
        const res = await this.axios.get(`/3/person/${celebrityId}`);
        commit("SET_CURRENT_CELEBRITY", res.data);
        commit("SET_LOADING_STATUS_INACTIVE");

        return;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
