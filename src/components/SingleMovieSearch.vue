<template>
  <div>
    <div class="container">
      <b-card
        :img-src="
          movie.poster_path
            ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
            : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
        "
        img-alt="Card image"
        img-width="185"
        img-left
        class="mb-3"
      >
        <b-card-title>{{ movie.title }}</b-card-title>
        <b-card-text>
          {{ movie.overview }}
        </b-card-text>
        <div class="offset-lg-10 offset-md-9 offset-sm-0">
          <b-button
            variant="outline-primary"
            @click="redirectToMovie(movie.id)"
            size="md"
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
  methods: {
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>

<style>
</style>