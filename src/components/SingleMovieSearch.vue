<template>
  <div>
    <div class="movie-result container">
      <b-card
        :img-src="
          movie.poster_path
            ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
            : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
        "
        img-alt="Card image"
        img-width="185"
        img-left
        class="mb-3 img-fluid"
      >
        <b-card-title>{{ movie.title }}</b-card-title>
        <b-card-text>
          {{ overview }}
        </b-card-text>
        <div class="offset-lg-10 offset-md-9 offset-sm-0">
          <b-button variant="dark" @click="redirectToMovie(movie.id)" size="md"
            >Details</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    overview() {
      return this.movie.overview.length >= 125
        ? this.movie.overview.slice(0, 125) + "..."
        : this.movie.overview;
    },
  },
  methods: {
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>

<style lang="scss">
.movie-result .card {
  --bs-card-bg: rgba(74, 36, 141, 0.493);
  --bs-card-color: white;
}
.movie-result .card-title {
  margin-bottom: 20px;
}
.movie-result .card-text {
  max-width: 500px;
}
@media (max-width: 450px) {
  .movie-result .card-text {
    display: none;
  }
}
</style>