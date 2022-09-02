<template>
  <div class="movie-raiting">
    <progress
      class="movie-raiting__bar"
      :style="{
        accentColor: celebrityRatingColor
          ? celebrityRatingColor
          : movieRatingColor,
      }"
      :value="celebrityRating ? celebrityRating : movieRating"
      :max="celebrityRating ? 250 : 10"
    />
    <div class="movie-raiting__info row text-center">
      <h4 class="movie-raiting__title col-md-6 col-lg-5">Rating</h4>
      <p class="movie-raiting__number col-md-6 col-lg-3">
        {{ celebrityRating ? celebrityRating : movieRating }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["celebrityRating", "movieRating"],
  computed: {
    celebrityRatingColor() {
      switch (true) {
        case this.celebrityRating < 100:
          return "rgb(255, 80, 80)";
        case this.celebrityRating >= 100 && this.celebrityRating < 175:
          return "rgb(252, 255, 80)";
        case this.celebrityRating >= 175:
          return "rgb(150, 255, 80)";
        default:
          return null;
      }
    },
    movieRatingColor() {
      switch (true) {
        case this.movieRating < 4:
          return "rgb(255, 80, 80)";
        case this.movieRating >= 4 && this.movieRating < 6:
          return "rgb(252, 255, 80)";
        case this.movieRating >= 6:
          return "rgb(150, 255, 80)";
        default:
          return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-raiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
}
.movie-raiting__bar {
  max-width: 300px;
  width: 100%;
  height: 20px;
}
.movie-raiting__info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: white;
}
.movie-raiting__number {
  text-align: end;
  font-size: 1rem;
}
.movie-raiting__title {
  text-align: start;
  font-size: 1.2rem;
}
@media (max-width: 992px) {
  .movie-raiting__number {
    text-align: center;
  }
  .movie-raiting__title {
    text-align: center;
  }
}
@media (max-width: 450px) {
  .movie-raiting__title {
    display: none;
  }
}
</style>