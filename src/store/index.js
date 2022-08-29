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
      try {
        const res = await this.axios
          .get("/3/movie/popular", {
            params: {
              page: 1
            }
          })
          .then(res => res = res.data.results);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    async changePage(_, newPage) {
      try {
        const res = await this.axios
          .get("/3/movie/popular", {
            params: {
              page: newPage
            }
          })
          .then(res => res = res.data.results);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    async getMovie(_, id) {
      try {
        const res = await this.axios
          .get(`/3/movie/${id}`)
          .then(res => res = res.data);
        return res;
      } catch (error) {
        console.log(error);
      } 
    }
  }
})
