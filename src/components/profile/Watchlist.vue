<template>
  <div class="watchlist mt-5">
    <h2 class="watchlist__title">
      My Watchlist
    </h2>
    <ul class="watchlist__list">
      <li
        v-for="(movie, i) in watchlist"
        :key="`watchlist item ${i}`"
        class="watchlist__item"
      >
        <div class="d-flex">
          <img
            class="watchlist__img"
            :src="posterPath(movie.poster_path)"
            alt="movie poster"
          >
          <div class="watchlist__item-info">
            <h2 class="watchlist__item-title">
              {{ movie.title }}
            </h2>
            <p>Votes: {{ movie.vote_average }}</p>
          </div>
        </div>
        <button
          class="watchlist__btn btn btn-dark"
          @click="redirectToMovie(movie.id)"
        >
          To movie
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    watchlist: {
      type: Array,
      default:()=>[],
    },
  },
  computed: {
  },
  methods: {
    posterPath(poster_path) {
      return poster_path
        ? "https://image.tmdb.org/t/p/w92/" + poster_path
        : "https://dummyimage.com/90x140/000/00ff8c";
    },
    redirectToMovie(id) {
      this.$router.push(`/movie/${id}`).catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.watchlist{
  color:white;
  margin-top: 15px;
    &__title{
        font-size:1.5rem;
    }
    &__list{
     padding: 0;
    }
    &__item-title{
        font-size:1.25rem;
    }
    &__item{
        display: flex;
        border: 1px solid rgba(0, 0, 0, 0.116);
        box-shadow: 7px 8px 24px -10px rgb(0, 0, 0);
        background-color: rgba(74, 36, 141, 0.493);
        justify-content: space-between;
        border-radius: 10px;
        margin-bottom: 10px;
        align-items: flex-start;
    }
    &__item-info{
        padding:10px;
        align-self: flex-start;
        margin: 0 10px 0 10px;
    }
    &__btn{
        margin: 10px;
    }
    &__img{
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
}
</style>