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
          <div class="d-flex align-items-start mt-4">
            <b-button
              v-if="movie.homepage"
              class="movie__homepage-btn mb-3"
              variant="outline-secondary"
              @click="toMovieHomepage(movie.homepage)"
            >
              Go to the movie site
            </b-button>
            <b-button
              v-if="!isInWatchlist"
              class="movie__watchlist-btn mb-3"
              variant="info"
              @click="addToWatchlist(movie.id)"
            >
              <span class="btn-label"><em class="icon-bookmark" /></span>Add to watchlist
            </b-button>
            <b-button
              v-else
              class="movie__watchlist-btn mb-3"
              variant="success"
            >
              <span class="btn-label"><em class="icon-ok" /></span>Movie added
            </b-button>
          </div>
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
        v-if="actors.length"
        class="row my-0 gx-2"
      >
        <MediaList
          title="Cast"
          route="/celebrity/"
          :elements="actors"
          class="pb-4 text-center actors"
        />
      </div>
    </div>
    <notifications
      group="watchlist"
      position="top left"
    >
      <template slot="body">
        <div
          class="watchlist__alert alert alert-success p-3 text-start m-2"
          role="alert"
        >
          Successfully added movie
        </div>
      </template>
    </notifications>
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
      isInWatchlist: false,
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
    ...mapActions(["getMovieImages", "getMovieActors", "sendToList", "getUserAccountDetails"]),
    toMovieHomepage(url) {
      window.location.href = url;
    },
    async addToWatchlist(id) {
      try {
        this.isInWatchlist = true;
        const session_id = localStorage.getItem("sessionToken");
        const { data } = await this.getUserAccountDetails(session_id);
        const mediaInfo = {
          media_type: "movie",
          media_id: id,
          session_id,
          account_id: data.id,
          list_type: "watchlist",
        };
        await this.sendToList(mediaInfo);
        this.$notify({
          group: "watchlist",
          ignoreDuplicates: true,
        });
      } catch (e) {
        console.log(e);
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
  padding: 40px 40px 40px 40px;
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
  .movie__homepage-btn{
    color:white;
    margin-right:10px;
  }
}
.watchlist__alert{
  background-color: rgb(41, 255, 148);
  border: none;
  color: black;
}
</style>
