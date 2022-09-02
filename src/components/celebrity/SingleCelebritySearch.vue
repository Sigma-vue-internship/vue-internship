<template>
  <div>
    <div class="celebrity-result container">
      <b-card
        :img-src="
          celebrity.profile_path
            ? 'https://image.tmdb.org/t/p/w185/' + celebrity.profile_path
            : 'https://dummyimage.com/185x280/000/00ff8c'
        "
        img-alt="Card image"
        img-width="185"
        img-left
        @click="redirectToMovie(celebrity.id)"
        class="mb-3"
      >
        <b-card-title>{{ celebrity.name }}</b-card-title>
        <div class="rating">
          <Rating :celebrityRating="celebrityRating" />
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
import Rating from "@/components/common/Rating.vue";
export default {
  name: "SingleCelebritySearch",
  components: { 
    Rating
  },
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
    celebrityRating() {
      return Math.floor(this.celebrity.popularity);
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
.celebrity-result .rating {
  width: 30%;
}
@media (max-width: 992px) {
  .celebrity-result .rating {
    width: 60%;
  }
}

@media (max-width: 450px) {
  .celebrity-result .card-text {
    display: none;
  }
  .celebrity-result .card-title {
    font-size: 18px;
  }
}
</style>