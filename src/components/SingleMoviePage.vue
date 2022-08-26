<template>
  <div class="singleMovie">
    <SpinnerLoader :isLoading="movie.poster_path ? false : true" />
    <b-card
      :title="movie.title"
      :sub-title="movie.tagline"
      :img-src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
      img-alt="Image"
      img-height="400"
      img-width="250"
      img-left
      tag="article"
    >
      <b-card-body class="text-left">
        <b-card-text>
          <span>Language: </span>
          {{ movie.original_language }}
        </b-card-text>
        <b-card-text>
          <span>Status: </span>
          {{ movie.status }}
        </b-card-text>
        <b-card-text>
          <span>Release date: </span>
          {{ movie.release_date }}
        </b-card-text>
        <b-card-text>
          <span>Runtime: </span>
          {{ movie.runtime }} minutes
        </b-card-text>
        <b-card-text>{{ movie.overview }}</b-card-text>
        <b-button
          v-if="movie.homepage"
          :href="movie.homepage"
          variant="dark"
        >
          Go to the movie site
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import SpinnerLoader from './SpinnerLoader';
export default {
  name: "SingleMoviePage",
  props: {
    movie: Object
  },
  components: {
    SpinnerLoader
  },
  data() {
    return {
      isLoading: false
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
  .singleMovie {
    margin-top: 71px;
    margin-bottom: 71px;
    width: 100%;
    .card {
    width: 1200px;
    margin: auto;
    }
    span {
      font-weight: 700;
    }
  }
</style>
