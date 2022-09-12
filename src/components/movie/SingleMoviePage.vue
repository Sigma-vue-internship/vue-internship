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
      <div
        v-if="reviews.length || actors.length"
        class="pt-3 tabElement"
      >
        <b-tabs content-class="mt-3" fill>
          <b-tab
            title="Cast"
            active
          >
            <div class="row my-0 gx-2">
              <MediaList
                route="/celebrity/"
                :elements="actors"
                class="pb-4 text-center actors"
              />
            </div>
          </b-tab>
          <b-tab
            v-if="reviews.length"
            title="Reviews"
          >
            <ul class="row my-0 gx-2 reviews">
              <li
                v-for="review in reviews"
                :key="review.uuid"
                class="pb-3 text-white"
              >
                <MovieReview :review="review" />
              </li>
            </ul>
          </b-tab>
        </b-tabs>
      </div>
      <div
        v-show="reviews.length && !isLoading"
        v-intersection="changeReviewsPage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Carousel from "@/components/common/Carousel";
import Rating from "@/components/common/Rating";
import SpinnerLoader from "@/components/common/SpinnerLoader";
import MediaList from "@/components/media/MediaList";
import MovieReview from "@/components/movie/MovieReview";
export default {
  name: "SingleMoviePage",
  components: {
    Carousel,
    Rating,
    SpinnerLoader,
    MediaList,
    MovieReview,
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
      reviews: [],
      reviewsPage: 1,
      totalPages: 0,
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
      await this.getActors();
      await this.getImgs();
      await this.getReviews();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  },
  methods: {
    ...mapActions(["getMovieImages", "getMovieActors", "getMovieReviews", "changeMovieReviewsPage"]),
    toMovieHomepage(url) {
      window.location.href = url;
    },
    async getActors() {
      try {
        const response = await this.getMovieActors(this.movie.id);
        const { data } = response;
        this.actors = data.cast;
      } catch (error) {
        console.error(error);
      }
    },
    async getImgs() {
      try {
        this.movieImgRes = await this.getMovieImages(this.movie.id);
      } catch (error) {
        console.error(error);
      }
    },
    async getReviews() {
      try {
        const response = await this.getMovieReviews(this.movie.id);
        const { data } = response;
        this.reviews = data.results;
        this.totalPages = data.total_pages;
      } catch (error) {
        console.error(error);
      }
    },
    async changeReviewsPage() {
      if(this.reviewsPage > this.totalPages) {
        return;
      }
      try {
        this.reviewsPage++;
        const obj = { id: this.movie.id, page: this.reviewsPage };
        const response = await this.changeMovieReviewsPage(obj);
        const { data } = response;
        this.reviews = this.reviews.concat(data.results);
      } catch (error) {
        console.error(error);
      }
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
.reviews {
  padding-left: 0;
}
.tabElement {
  .nav-tabs {
    border-bottom: 1px solid $lightGreen;
    cursor: pointer;

    .nav-link {
      border: 1px solid $lightGreen;
      color: $lightGreen;
    }
    .nav-link.active {
      background-color: $lightGreen;
      border: 1px solid $lightGreen;
      color: rgb(27, 13, 45);
    }
  }
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
