import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allMovies: [],
    page: 1,
    totalPages: 0
  },
  getters: {
    getMovies: state => state.allMovies,
    getPage: state => state.page,
    getPages: state => state.totalPages,
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
    }
  }
})
