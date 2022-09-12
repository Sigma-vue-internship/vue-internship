<template>
  <div class="watchlist">
    <ul
      v-if="watchlist.length"
      class="scroll watchlist__list"
    >
      <li
        v-for="(movie, i) in currentMovies"
        :key="`watchlist item ${i}`"
        class="watchlist__item"
        @click="redirectToMovie(movie.id)"
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
      <div
        v-show="currentMovies.length"
        v-intersection="loadMoreMovies"
      />
    </ul>
    <p v-else>
      There will be your watchlist
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    watchlist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentMovies: [...this.watchlist.slice(0, 5)],
      isLoading: false,
    };
  },
  created() {
    this.setUserWatchlist(this.watchlist);
  },
  methods: {
    ...mapActions(["setUserWatchlist"]),
    loadMoreMovies() {
      const currentMoviesLength = this.currentMovies.length;
      if (currentMoviesLength <= this.watchlist.length) {
        this.currentMovies = [...this.currentMovies, ...this.watchlist.slice(currentMoviesLength, currentMoviesLength + 5)];
      }
    },
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
  @import "../../assets/scss/variables.scss";
.scroll {
  overflow-x: hidden;
  overflow-y: hidden;
}
.scroll::-webkit-scrollbar {
  height: 30px;
}
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px black;
  -webkit-box-shadow: inset 0 0 6px black;
  border-radius: 20px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: $lightGreen;
  box-shadow: inset 0 0 6px black;
  -webkit-box-shadow: inset 0 0 6px black;
}
.watchlist{
  color:white;
  margin-top: 15px;
    &__title{
        font-size:1.5rem;
    }
    &__list{
    max-height: 440px;
      overflow-y: scroll;
     padding: 0;
    }
    &__item-title{
        font-size:1.25rem;
    }
    &__item{
        display: flex;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.116);
        box-shadow: 7px 8px 24px -10px rgb(0, 0, 0);
        background-color: rgba(74, 36, 141, 0.493);
        justify-content: space-between;
        border-radius: 10px;
        margin:0 20px 10px 0;
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
    @media(max-width:768px){
      &__item-info{
        font-size: 0.75rem;
        text-align: left;
      }
      &__item-title{
        font-size: 1rem;
      }
      &__btn{
        display:none;
    }
    }
}
</style>