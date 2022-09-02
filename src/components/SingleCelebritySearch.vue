<template>
  <div>
    <div class="celebrity-result container">
      <b-card
        :img-src="
          celebrity.profile_path
            ? 'https://image.tmdb.org/t/p/w185/' + celebrity.profile_path
            : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'
        "
        img-alt="Card image"
        img-width="185"
        img-left
        @click="redirectToMovie(celebrity.id)"
        class="mb-3"
      >
        <b-card-title>{{ celebrity.name }}</b-card-title>
        <div class="movie-raiting">
          <progress
            class="movie-raiting__bar"
            :style="{ accentColor: celebrityRaitingColor }"
            :value="celebrityRaiting"
            max="250"
          />
          <div class="movie-raiting__info">
            <h4 class="movie-raiting__title">Popularity</h4>
            <p class="movie-raiting__number">{{ celebrityRaiting }}</p>
          </div>
        </div>
        <b-card-text
          ><strong>Known for:</strong>
          {{ knownFor ? knownFor : "Movies not found" }}</b-card-text
        >
        <div class="py-2">
          <b-button
            variant="dark"
            @click="redirectToMovie(celebrity.id)"
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
    celebrity: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    redirectToMovie(id) {
      this.$router.push(`/celebrity/${id}`);
    },
  },
  computed: {
    knownFor() {
      return (
        this.celebrity.known_for &&
        this.celebrity.known_for.map((movie) => movie.title).join(", ")
      );
    },
    celebrityRaiting() {
      return this.celebrity.popularity;
    },
    celebrityRaitingColor() {
      if (this.celebrityRaiting < 100) {
        return "rgb(255, 80, 80)";
      }
      if (this.celebrityRaiting >= 100 && this.celebrityRaiting < 175) {
        return "rgb(252, 255, 80)";
      }
      if (this.celebrityRaiting >= 175) {
        return "rgb(150, 255, 80)";
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
.celebrity-result .card {
  --bs-card-bg: rgba(74, 36, 141, 0.316);
  --bs-card-color: white;
  cursor: pointer;
}
@media (max-width: 450px) {
  .celebrity-result .card-text {
    display: none;
  }
  .celebrity-result .card-title {
    font-size: 18px;
  }
  .movie-raiting__title {
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