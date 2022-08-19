<template>
  <div>
    <p v-if="joke">{{ joke }}</p>
    <button @click="getJoke">Generate Joke</button>
    <p v-if="jokeHistory.length > 1"><a @click="showHideJokes" href="javascript:void(0)">{{ labelText }} Joke History</a></p>
    <ol v-if="showHistory">
      <li v-for="(joke, index) in jokeHistory" :key="`id-${index}`">{{ joke }}</li>
    </ol>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "JokeGenerator",
  data() {
    return {
      showHistory: false,
    }
  },
  computed: {
    ...mapGetters({ joke: 'getJoke', jokeHistory: 'getJokeHistory' }),
    labelText() {
      return !this.showHistory ? 'Show' : 'Hide';
    },
    // joke() {
    //   return this.$store.getters.getJoke;
    // },
    // jokeHistory() {
    //   return this.$store.getters.getJokeHistory;
    // }
  },
  methods: {
    ...mapActions(['getJoke']),
    // getJoke() {
    //  this.$store.dispatch('getJoke');
    // },
    showHideJokes() {
      this.showHistory = !this.showHistory;
    }
  }
}
</script>

<style scoped>
  ol {
    border: 3px dashed #42b983;
    padding: 20px;
    margin: 20px;
  }

  li {
    margin-left: 20px;
  }
</style>
