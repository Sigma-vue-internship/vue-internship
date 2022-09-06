<template>
  <div>
    <div class="movie-result container px-3">
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
        <div class="row d-flex justify-content-between">
          <b-card-title class="col-md-5">{{ movie.title }} </b-card-title>
          <span
            class="
              movie-badge
              badge badge-secondary
              col-6 col-sm-3 col-md-2 col-lg-1
              mx-md-4
              mb-3
            "
            >Movie</span
          >
        </div>
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
    Rating,
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
      this.$router.push(`/movie/${id}`).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
.movie-badge {
  display: flex;
  margin: 0 10px 0 auto;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 15px;
  height: 30px;
  background-color: $lightGreen;
}
.movie-result .rating {
  width: 30%;
  margin-top: 0;
  margin-bottom: 15px;
}
.movie-result .movie-raiting {
  margin-top: 0;
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
@media (max-width: 768px) {
  .movie-result .card-text {
    display: none;
  }
  .movie-result .rating {
    width: 100%;
  }
  .movie-result .movie-raiting {
    width: 100%;
  }
  .movie-result .card-title {
    font-size: 18px;
  }
}
</style>