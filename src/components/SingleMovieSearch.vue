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
        @click="redirectToMovie(movie.id)"
        class="mb-3 img-fluid"
      >
        <b-card-title>{{ movie.title }}</b-card-title>
        <div class="movie-raiting">
          <progress
            class="movie-raiting__bar"
            :style="{ accentColor: movieRaitingColor }"
            :value="movieRaiting"
            max="10"
          />
          <div class="movie-raiting__info">
            <h4 class="movie-raiting__title">Movie raiting</h4>
            <p class="movie-raiting__number">{{ movieRaiting }}</p>
          </div>
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
    movieRaiting() {
      return this.movie.vote_average;
    },
    movieRaitingColor() {
      if (this.movieRaiting < 4) {
        return "rgb(255, 80, 80)";
      }
      if (this.movieRaiting >= 4 && this.movieRaiting < 6) {
        return "rgb(252, 255, 80)";
      }
      if (this.movieRaiting >= 6) {
        return "rgb(150, 255, 80)";
      }
      return null;
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
}
.movie-raiting {
  width: 30%;
}
@media (max-width: 768px) {
  .movie-raiting {
    width: 100%;
  }
}
.movie-raiting__bar {
  width: 100%;
  height: 20px;
}
.movie-raiting__info {
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: white;
}
.movie-raiting__number {
  font-size: 1rem;
}
.movie-raiting__title {
  font-size: 1.2rem;
}
</style>