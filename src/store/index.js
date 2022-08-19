import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

const headers = { Accept: 'application/json' }
const url = 'https://icanhazdadjoke.com/';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    joke: null,
    jokeHistory: [],
  },
  getters: {
    getJoke: state => state.joke,
    getJokeHistory: state => state.jokeHistory
  },
  mutations: {
    SET_JOKE(state, joke) {
      state.joke = joke;
      state.jokeHistory.push(joke);
    }
  },
  actions: {
    async getJoke(state) {
      const response = await axios.get(url, { headers });
      const { data: { joke } } =  response;
      state.commit('SET_JOKE', joke);
    },
  },
})
