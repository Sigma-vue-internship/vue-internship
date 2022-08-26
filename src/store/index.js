import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentMovies: [],
    loadingStatus: false,
    allMovies: [],
    page: 1,
    totalPages: 0
  },
  getters: {
    getMovies: state => state.allMovies,
    getPage: state => state.page,
    getPages: state => state.totalPages,
    getAllMovies: (state) => state.currentMovies,
    getLoadingStatus: (state) => state.loadingStatus,
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies;
    },
    SET_PAGE(state, page) {
      state.page = page;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    }
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
    async setMovies({ commit, state }) {
      const res = await this.axios.get("/3/movie/popular", {
        params: {
          page: state.page
        }
      });
      commit("SET_TOTAL_PAGES", res.data.total_pages);
      commit("SET_MOVIES", res.data.results);
    },
    async changePage({ commit, state }, newPage) {
      commit("SET_PAGE", newPage);
      const res = await this.axios.get("/3/movie/popular", {
        params: {
          page: state.page
        }
      });
      commit("SET_TOTAL_PAGES", res.data.total_pages);
      commit("SET_MOVIES", res.data.results);
    },
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
  }
})
