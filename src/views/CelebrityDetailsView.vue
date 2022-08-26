<template>
  <div>
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <div v-else class="celebrity-profile">
      <div class="row">
        <div class="celebrity-profile__image-container col-md-12 col-lg-4 px-5">
          <img
            class="celebrity-profile__image"
            :src="profilePath"
            alt="celebrity profile image"
          />
        </div>
        <div class="celebrity-profile__info col-md-12 col-lg-6 p-5">
          <h1 class="celebrity-profile__name">{{ celebrity.name }}</h1>
          <h2 class="celebrity-profile__bio-name">Biography</h2>
          <p class="celebrity-profile__bio">{{ celebrity.biography }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from "../components/SpinnerLoader.vue";
export default {
  data() {
    return {
      resData: null,
      isLoading: false,
    };
  },
  computed: {
    celebrity() {
      return this.resData.data;
    },
    profilePath() {
      return this.celebrity.profile_path
        ? "https://image.tmdb.org/t/p/w300/" + this.celebrity.profile_path
        : "https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png";
    },
  },
  async created() {
    try {
      this.isLoading = true;
      this.resData = await this.$store.dispatch(
        "findSingleCelebrity",
        this.$route.params.id
      );
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
    }
  },
  components: { SpinnerLoader },
};
</script>

<style lang="scss">
.celebrity-profile {
  .celebrity-profile__info {
    margin-top: 20px;
    background-color: rgba(87, 84, 255, 0.281);
    border: 10px;
    border-radius: 10px;
    color: white;
    .celebrity-profile__bio-name {
      font-size: 22px;
      margin: 20px 0 20px 0;
    }
  }
}
.celebrity-profile__image-container {
  margin-top: 20px;

  position: relative;
  .celebrity-profile__image {
    border: 15px solid rgb(87, 84, 255);
    width: 300px;
    border-radius: 20px;
    display: block;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>