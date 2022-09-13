<template>
  <div
    v-if="movieRating || celebrityRating"
    class="movie-raiting"
  >
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
    <div :class="`movie-raiting__info row text-center movie-raiting__${getMode}`">
      <h4 class="movie-raiting__title col-md-6 col-lg-5">
        Rating
      </h4>
      <p class="movie-raiting__number col-lg-4">
        {{ celebrityRating ? celebrityRating : movieRating }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Rating",
  props: {
    celebrityRating: {
      type: Number,
      default: undefined,
    },
    movieRating: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      colors: ["#FF5050FF", "#FCFF50FF", "#96FF50FF"],
    };
  },
  computed: {
    ...mapGetters(["getMode"]),
    celebrityRatingColor() {
      return this.setRatingColor("celebrityRating", 100, 175);
    },
    movieRatingColor() {
      return this.setRatingColor("movieRating", 4, 6);
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
    },
  },
};
</script>

<style lang="scss" scoped>
.movie-raiting {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  width: 90%;
  &__bar {
    max-width: 300px;
    width: 100%;
    height: 20px;
  }
  &__info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  &__number {
    text-align: end;
    font-size: 1rem;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  &__title {
    text-align: start;
    font-size: 1.2rem;
  }
  &__dark {
  color: white;
  }
  &__light {
    color: black;
  }
}
@media (max-width: 992px) {
  .movie-raiting {
    &__number {
      text-align: center;
    }
    &__title {
      text-align: center;
    }
  }
}
@media (max-width: 992px) {
  .movie-raiting {
    &__title {
      display: none;
    }
  }
}
</style>
