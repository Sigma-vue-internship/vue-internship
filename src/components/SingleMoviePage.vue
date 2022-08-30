<template>
  <div class="movie__container p-5">
    <div class="row movie">
      <div class="movie__poster col-lg-4">
        <img
          class="movie__poster-img img-fluid"
          :src="'https://image.tmdb.org/t/p/w300/' + movie.poster_path"
          alt="movie poster"
        />
      </div>
      <div class="movie__info col-lg-7">
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
  </div>
</template>

<script>
export default {
  name: "SingleMoviePage",
  props: {
    movie: Object,
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
.movie {
  display: flex;
  justify-content: space-around;
}
.movie__poster {
  display: flex;
  justify-content: center;
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
