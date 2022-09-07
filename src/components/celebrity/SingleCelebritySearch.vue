<template>
  <div>
    <div class="celebrity-result container px-3">
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
        <div class="row d-flex justify-content-between">
          <b-card-title class="col-md-5">{{ celebrity.name }} </b-card-title>
          <span
            class="
              movie-badge
              badge badge-secondary
              col-6 col-sm-3 col-md-2 col-lg-1
              mx-md-4
              mb-3
            "
            >Actor</span
          >
        </div>
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
import Rating from "@/components/common/Rating";
export default {
  name: "SingleCelebritySearch",
  components: {
    Rating,
  },
  props: {
    celebrity: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    redirectToMovie(id) {
      this.$router.push(`/celebrity/${id}`).catch(() => {});
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
@import "../../assets/scss/variables.scss";
.movie-badge {
  display: flex;
  margin: 0 10px 0 auto;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 15px;
  height: 30px;
  background-color: rgb(228, 94, 228);
}
.celebrity-result {
  .card {
    --bs-card-bg: rgba(74, 36, 141, 0.316);
    --bs-card-color: white;
    cursor: pointer;
  }
  .rating {
    width: 30%;
    margin-bottom: 15px;
  }
  .movie-raiting {
    margin-top: 0;
  }
}
@media (max-width: 992px) {
  .celebrity-result {
    .rating {
      width: 60%;
    }
  }
}

@media (max-width: 768px) {
  .celebrity-result {
    .card-text {
      display: none;
    }

    .rating,
    .movie-raiting {
      width: 100%;
    }

    .card-title {
      font-size: 18px;
    }
  }
}
</style>
