import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allMovies: []
  },
  getters: {
    getMovies: state => state.allMovies
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.allMovies = movies;
    }
  },
  actions: {
    setMovies({commit}, movies) {
      commit("SET_MOVIES", movies);
    }
  },
  modules: {
  }
})
