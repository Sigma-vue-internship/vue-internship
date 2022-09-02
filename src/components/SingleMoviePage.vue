<template>
  <div class="container p-5">
    <div class="row gx-0 justify-content-between">
      <div class="movie__poster col-lg-4 col-xl-3">
        <img
          class="movie__poster-img img-fluid"
          :src="posterPath"
          alt="movie poster"
        />
        <div class="movie-raiting">
          <div class="movie-raiting__info">
            <h2 class="movie-raiting__title">Movie raiting</h2>
            <p class="movie-raiting__number">{{ movieRaiting }}</p>
          </div>
          <progress
            class="movie-raiting__bar"
            :style="{ accentColor: movieRaitingColor }"
            :value="movieRaiting"
            max="10"
          />
        </div>
      </div>
      <div class="movie__info col-lg-7 col-xl-8">
        <h1>{{ movie.title }}</h1>
        <span class="movie__tagline" v-if="movie.tagline">{{
          movie.tagline
        }}</span>
        <p>
          <strong>Genres:</strong>
          {{ movie.genres.map((genre) => genre.name).join(", ") }}
        </p>
        <p><strong>Language:</strong> {{ movie.original_language }}</p>
        <p><strong>Status:</strong> {{ movie.status }}</p>
        <p><strong>Release date:</strong> {{ movie.release_date }}</p>
        <p><strong>Runtime:</strong> {{ movie.runtime }}</p>
        <p class="movie__overview">{{ movie.overview }}</p>
        <b-button v-if="movie.homepage" :href="movie.homepage" variant="dark">
          Go to the movie site
        </b-button>
      </div>
    </div>
    <div v-if="imgUrls && imgUrls.length" class="row my-4 gx-0">
      <Carousel class="col-lg-12 movie-carousel" :imgUrls="imgUrls" />
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
export default {
  data() {
    return {
      movieImgRes: null,
    };
  },
  components: { Carousel },
  name: "SingleMoviePage",
  props: {
    movie: Object,
  },
  computed: {
    imgUrls() {
      return (
        this.movieImgRes &&
        this.movieImgRes.data.backdrops
          .map(
            (imageObj) =>
              `https://image.tmdb.org/t/p/original/${imageObj.file_path}`
          )
          .splice(0, 5)
      );
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
    posterPath() {
      return this.movie.poster_path
        ? "https://image.tmdb.org/t/p/w300/" + this.movie.poster_path
        : "https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png";
    },
    movieRaiting() {
      return this.movie.vote_average;
    },
  },
  async created() {
    try {
      this.movieImgRes = await this.$store.dispatch(
        "getMovieImages",
        this.movie.id
      );
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.movie-carousel {
  padding: 0;
}
@media (max-width: 992px) {
  .movie-carousel {
    margin-right: 0;
  }
}
.movie__poster {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
  .movie__poster-img {
    box-shadow: 8px 8px 24px 0px rgb(0 0 0);
    margin-bottom: 40px;
    border-radius: 10px;
  }
  .movie-raiting {
    width: 60%;
  }
  .movie-raiting__bar {
    width: 100%;
    height: 30px;
  }
  .movie-raiting__info {
    display: flex;
    justify-content: space-between;
    align-content: center;
    text-align: end;
    color: white;
  }
  .movie-raiting__number {
    font-size: 1rem;
  }
  .movie-raiting__title {
    font-size: 1.2rem;
  }
}
.movie__info {
  background-color: rgba(74, 36, 141, 0.316);
  box-shadow: 8px 8px 24px 0px rgb(0 0 0);
  padding: 40px 40px 80px 40px;
  border-radius: 10px;
  color: white;
  > p {
    font-size: 18px;
    font-weight: 400;
  }
  .movie__overview {
    font-size: 16px;
  }
  .movie__tagline {
    display: block;
    padding-bottom: 10px;
    color: rgba(255, 255, 255, 0.507);
  }
}
</style>
