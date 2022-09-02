<template>
  <div>
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <div class="container p-5">
      <div v-if="!isLoading" class="row gx-0 justify-content-between">
        <div class="movie__poster col-lg-4 col-xl-3">
          <img
            class="movie__poster-img img-fluid"
            :src="posterPath"
            alt="movie poster"
          />
          <Rating :movieRating="movieRating" />
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
      <div v-if="imgUrls && imgUrls.length && !isLoading" class="row my-4 gx-0">
        <Carousel class="col-lg-12 movie-carousel" :imgUrls="imgUrls" />
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "./Carousel.vue";
import Rating from "./Rating.vue";
import SpinnerLoader from "./SpinnerLoader.vue";
export default {
  data() {
    return {
      movieImgRes: null,
      isLoading: false,
    };
  },
  components: { Carousel, Rating, SpinnerLoader },
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
    posterPath() {
      return this.movie.poster_path
        ? "https://image.tmdb.org/t/p/w300/" + this.movie.poster_path
        : "https://dummyimage.com/300x450/000/00ff8c";
    },
    movieRating() {
      return Math.floor(this.movie.vote_average);
    },
  },
  async created() {
    try {
      this.isLoading = true;
      this.movieImgRes = await this.$store.dispatch(
        "getMovieImages",
        this.movie.id
      );
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;

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
    border-radius: 10px;
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
