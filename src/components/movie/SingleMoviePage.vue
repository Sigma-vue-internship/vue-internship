<template>
  <div>
    <SpinnerLoader
      v-if="isLoading"
      :is-loading="isLoading"
    />
    <div class="container py-3">
      <div
        v-if="!isLoading"
        class="row gx-0 justify-content-between"
      >
        <div class="movie__poster col-lg-4 col-xl-3">
          <img
            class="movie__poster-img img-fluid"
            :src="posterPath"
            alt="movie poster"
          >
          <Rating :movie-rating="movieRating" />
        </div>
        <div class="movie__info col-lg-7 col-xl-8">
          <h1>{{ movie.title }}</h1>
          <span
            v-if="movie.tagline"
            class="movie__tagline"
          >{{
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
          <p class="movie__overview">
            {{ movie.overview }}
          </p>
          <b-button
            v-if="movie.homepage"
            variant="dark"
            @click="toMovieHomepage(movie.homepage)"
          >
            Go to the movie site
          </b-button>
        </div>
      </div>
      <div
        v-if="imgUrls && imgUrls.length && !isLoading"
        class="row my-4 gx-0"
      >
        <Carousel
          class="col-lg-12 movie-carousel"
          :img-urls="imgUrls"
        />
      </div>
      <div class="row my-0 gx-2">
        <MediaList
          title="Cast"
          route="/celebrity/"
          :elements="actors"
          class="pb-4 actors"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Carousel from "@/components/common/Carousel";
import Rating from "@/components/common/Rating";
import SpinnerLoader from "@/components/common/SpinnerLoader";
import MediaList from "@/components/media/MediaList";
export default {
  name: "SingleMoviePage",
  components: {
    Carousel,
    Rating,
    SpinnerLoader,
    MediaList,
  },
  props: {
    movie: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      movieImgRes: null,
      isLoading: false,
      actors: [],
    };
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
      const response = await this.getMovieActors(this.movie.id);
      const { data } = response;
      this.actors = data.cast;
      this.movieImgRes = await this.getMovieImages(this.movie.id);
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
    }
  },
  methods: {
    ...mapActions(["getMovieImages", "getMovieActors"]),
    toMovieHomepage(url) {
      window.location.href = url;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
.movie-carousel {
  padding: 0;
}
.actors {
  padding-top: 0!important;
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
