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
  data() {
    return {
      colors: [
        '#FF5050FF',
        '#FCFF50FF',
        '#96FF50FF'
      ],
    }
  },
  computed: {
    celebrityRatingColor() {
      return this.setRatingColor('celebrityRating', 100, 175);
    },
    movieRatingColor() {
      return this.setRatingColor('movieRating', 4, 6);
    },
  },
  methods: {
    setRatingColor(type, val1, val2) {
      switch (true) {
        case this[type] < val1:
          return this.colors[0];
        case this[type] >= val1 && this[type] < val2:
          return this.colors[1];
        case this[type] >= val2:
          return this.colors[2];
        default:
          return null;
      }
    }
  }
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
