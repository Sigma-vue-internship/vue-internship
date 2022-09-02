<template>
  <li>
    <b-card
        :img-src="'https://image.tmdb.org/t/p/w185/' + movie.poster_path"
        :img-alt="'Card image '+movie.id"
        img-height="290px"
        img-top
    >
      <b-card-text text-muted>{{ movie.title }}</b-card-text>
    </b-card>
  </li>
</template>

<script>
export default {
  name: "SingleMovieElementList",
  props: {
    movie: Object
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
  .movie {
    width: 200px;
    margin: 10px;
  }
  .card-body {
    @include flex-center(column);
    height: 80px;
  }
  p {
    overflow: hidden;
  }
</style>
