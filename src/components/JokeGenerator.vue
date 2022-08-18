<template>
  <div>
    <p v-if="joke">{{ joke }}</p>
    <button @click="getJoke">Generate Joke</button>
    <p v-if="jokeHistory.length > 1"><a @click="showHideJokes" href="javascript:;">{{ labelText }} Joke History</a></p>
    <ol v-if="showHistory">
      <li v-for="(joke, index) in jokeHistory" :key="`li-${index}`">{{ joke }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "JokeGenerator",
  data() {
    return {
      joke: null,
      jokeHistory: [],
      showHistory: false,
    }
  },
  computed: {
    labelText() {
      return !this.showHistory ? 'Show' : 'Hide';
    }
  },
  methods: {
   async getJoke() {
      const config = {
        headers: {
          Accept: 'application/json'
        }
      }
      // fetch('https://icanhazdadjoke.com/', config)
      //   .then(res => res.json())
      //   .then(res => this.setJoke(res.joke))
      const response = await this.axios.get('https://icanhazdadjoke.com/', config);
      const { data: { joke } } =  response;
      this.setJoke(joke);
    },
    setJoke(joke) {
      this.joke = joke;
      this.jokeHistory.push(joke);
    },
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
