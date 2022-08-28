<template>
  <div class="singleMovie">
    <b-card
      :title="movie.title"
      :sub-title="movie.tagline"
      :img-src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
      img-alt="Image"
      img-height="500"
      img-width="330"
      img-left
      class="cardMovie"
    >
      <b-card-body>
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
export default {
  name: "SingleMoviePage",
  props: {
    movie: Object
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
      text-align: left;
    }
    span {
      font-weight: 700;
    }
  }
</style>
