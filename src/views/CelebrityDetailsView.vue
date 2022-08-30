<template>
  <div class="celebrity-profile__back">
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <div v-else class="celebrity-profile">
      <div class="row celebrity-profile__container col-md-12 py-4">
        <div class="celebrity-profile__image-container col-md-12 col-lg-4 px-5">
          <img
            class="celebrity-profile__image img-fluid"
            :src="selectedImg ? selectedImg : profilePath"
            alt="celebrity profile image"
          />
          <div class="celebrity-profile__preview-container">
            <img
              v-for="(celImg, i) in celebrityImages"
              :key="`celelebrity_img ${i}`"
              class="celebrity-profile__preview-img"
              :src="celImg"
              @click="selectImg(celImg, i)"
            />
          </div>
        </div>
        <div class="celebrity-profile__info col-md-12 col-lg-6">
          <h1 class="celebrity-profile__name">{{ celebrity.name }}</h1>
          <h2 class="celebrity-profile__bio-name">Biography</h2>

          <p
            ref="bio"
            :class="
              isBioOpen
                ? 'celebrity-profile__bio bio--active'
                : 'celebrity-profile__bio'
            "
          >
            {{ celebrity.biography }}
          </p>

          <button
            @click="isBioOpen = !isBioOpen"
            class="btn btn-dark celebrity-profile__show-more-btn"
          >
            {{ isBioOpen ? "Hide" : "Show more" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerLoader from "../components/SpinnerLoader.vue";
export default {
  components: { SpinnerLoader },
  data() {
    return {
      resData: null,
      selectedImg: "",
      prevSelectedImg: "",
      isBioOpen: false,
      prevIndex: null,
      resImagesData: null,
      isLoading: false,
    };
  },
  methods: {
    selectImg(imgUrl, i) {
      if (this.celebrityImages[i] === this.profilePath) {
        this.selectedImg = "";
        this.celebrityImages[i] = this.prevSelectedImg;
        return;
      }
      if (!this.selectedImg) {
        this.prevIndex = i;
        this.prevSelectedImg = imgUrl;
        this.selectedImg = imgUrl;
        this.celebrityImages[i] = this.profilePath;
        return;
      }
      this.selectedImg = imgUrl;
      this.celebrityImages[i] = this.prevSelectedImg;
      this.prevIndex = i;
      this.prevSelectedImg = imgUrl;
    },
    showHideBio() {},
  },
  computed: {
    celebrity() {
      return this.resData.data;
    },
    celebrityImages() {
      if (this.resImagesData) {
        let [, , ...celebrityImages] = this.resImagesData.data.profiles;
        return celebrityImages
          .map(
            (imageObj) =>
              `https://image.tmdb.org/t/p/w300/${imageObj.file_path}`
          )
          .splice(0, 3);
      }
      return null;
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
      this.resImagesData = await this.$store.dispatch(
        "getCelebrityImages",
        this.$route.params.id
      );
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
    }
  },
  mounted() {
    setTimeout(() => console.log(this.$refs.bio), 100);
  },
};
</script>

<style lang="scss">
.celebrity-profile {
  background-color: rgba(63, 30, 121, 0.158);
  .celebrity-profile__info {
    position: relative;
    padding: 40px 40px 80px 40px;
    background-color: rgba(74, 36, 141, 0.316);
    box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);
    border-radius: 10px;
    color: white;

    .celebrity-profile__bio-name {
      font-size: 22px;
      margin: 20px 0 20px 0;
    }
    .celebrity-profile__show-more-btn {
      position: absolute;
      right: 50px;
    }
    .celebrity-profile__bio {
      max-height: 300px;
      padding: 20px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: inset 0px 0px 21px 0px rgb(0, 0, 0);
      transition: max-height cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
    }
    .bio--active {
      max-height: 700px;
    }
  }
}
.celebrity-profile__container {
  margin: 0;
}
.celebrity-profile__image-container {
  display: flex;
  flex-basis: 40%;
  justify-content: center;

  .celebrity-profile__preview-container {
    display: flex;
    flex-direction: column;

    padding-right: 10px;
  }
  .celebrity-profile__image {
    box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);
    align-self: flex-start;
    width: 300px;
    border-radius: 10px;
    display: block;
    margin: 0 15px 15px 15px;
  }
  .celebrity-profile__preview-img {
    width: 85px;
    margin-bottom: 10px;
    border-radius: 10px;
    opacity: 0.7;
    box-shadow: 8px 8px 24px 0px rgb(0, 0, 0);

    transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 500ms,
      opacity cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
    &:hover {
      transform: scale(1.2);
      z-index: 10;
      opacity: 1;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  @media (max-width: 992px) {
    .celebrity-profile__preview-container {
      flex-direction: column;
    }
  }
}
@media (max-width: 992px) {
  .celebrity-profile__image-container {
    flex-basis: 100%;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
