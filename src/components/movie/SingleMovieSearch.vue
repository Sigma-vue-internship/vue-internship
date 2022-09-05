<template>
  <div>
    <div class="movie-result container">
      <b-card
        :img-src="
          movie.poster_path
            ? 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
            : 'https://dummyimage.com/185x280/000/00ff8c'
        "
        img-alt="Card image"
        img-width="185"
        img-left
        @click="redirectToMovie(movie.id)"
        class="mb-3 img-fluid"
      >
        <b-card-title>{{ movie.title }}</b-card-title>
        <div class="rating">
          <Rating :movieRating="movieRating" />
        </div>
        <b-card-text>
          {{ overview }}
        </b-card-text>
        <div class="py-2 d-flex">
          <b-button variant="dark" @click="redirectToMovie(movie.id)" size="md"
            >Details</b-button
          >
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/common/Rating";
export default {
  name: "SingleMovieSearch",
  components: { 
    Rating 
  },
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
    movieRating() {
      return Math.floor(this.movie.vote_average);
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
.movie-result .rating {
  width: 30%;
  margin-bottom: 15px;
}
@media (max-width: 992px) {
  .movie-result .rating {
    width: 60%;
  }
}
.movie-result .card {
  --bs-card-bg: rgba(74, 36, 141, 0.493);
  --bs-card-color: white;
  cursor: pointer;
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
  .movie-result .card-title {
    font-size: 18px;
  }
}
</style>