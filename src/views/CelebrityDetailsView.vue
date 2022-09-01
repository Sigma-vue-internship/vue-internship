<template>
  <div class="celebrity-profile__back">
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <div
      v-else
      class="
        container
        d-flex
        flex-column
        align-items-center
        justify-content-center
        px-2
      "
    >
      <div class="row gx-0 py-4">
        <div class="celebrity-profile__image-container py-4 col-lg-5 col-xl-5">
          <div class="d-flex flex-column px-2">
            <img
              class="celebrity-profile__image img-fluid"
              :src="selectedImg ? selectedImg : profilePath"
              alt="celebrity profile image"
            />
            <div class="movie-raiting">
              <progress
                class="movie-raiting__bar"
                :style="{ accentColor: celebrityRaitingColor }"
                :value="celebrityRaiting"
                max="250"
              />
              <div class="movie-raiting__info row text-center">
                <h4 class="movie-raiting__title col-lg-5">Popularity</h4>
                <p class="movie-raiting__number col-lg-4">
                  {{ celebrityRaiting }}
                </p>
              </div>
            </div>
          </div>
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

        <div class="celebrity-profile__info col-lg-7 col-xl-7">
          <h1 class="celebrity-profile__name">{{ celebrity.name }}</h1>
          <p><strong> Birthday: </strong>{{ celebrity.birthday }}</p>
          <p>
            <strong> Also known as: </strong
            >{{ celebrity.also_known_as.join(", ") }}
          </p>
          <p>
            <strong> Place of birth: </strong>{{ celebrity.place_of_birth }}
          </p>
          <h2 class="celebrity-profile__bio-name">Biography</h2>

          <p class="celebrity-profile__bio">
            <vue-show-more-text
              :text="celebrity.biography"
              :lines="4"
              additional-content-css="font-size:16px;"
              additional-content-expanded-css="font-size:16px;"
              additional-anchor-css="font-size: 16px;"
              @click="showHideBio"
            />
          </p>
        </div>
      </div>
      <MediaList
        v-if="popularCelebrities.length"
        title="Popular actors"
        route="/celebrity/"
        :elements="popularCelebrities"
        :changePage="loadMorePopular"
      />
    </div>
  </div>
</template>

<script>
import SpinnerLoader from "../components/SpinnerLoader.vue";
import vueShowMoreText from "vue-show-more-text";
import MediaList from "../components/MediaList.vue";
export default {
  components: { SpinnerLoader, vueShowMoreText, MediaList },
  data() {
    return {
      resData: null,
      selectedImg: "",
      prevSelectedImg: "",
      prevIndex: null,
      resImagesData: null,
      resPopularCelebrities: null,
      popularCelebrities: [],
      currentPopularPage: 1,
      isLoading: false,
    };
  },
  methods: {
    async loadMorePopular() {
      this.currentPopularPage += 1;
      const { data } = await this.$store.dispatch(
        "changeCelebritiesPage",
        this.currentPopularPage
      );
      this.popularCelebrities = [...this.popularCelebrities, ...data.results];
    },
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
    setRouteWatcher() {
      this.$watch(
        () => this.$route.params,
        async () => {
          this.isLoading = true;
          this.selectedImg = "";
          this.resData = await this.$store.dispatch(
            "findSingleCelebrity",
            this.$route.params.id
          );
          this.resImagesData = await this.$store.dispatch(
            "getCelebrityImages",
            this.$route.params.id
          );
          this.isLoading = false;
        }
      );
    },
    async getCelebrityData() {
      this.resData = await this.$store.dispatch(
        "findSingleCelebrity",
        this.$route.params.id
      );
      this.resImagesData = await this.$store.dispatch(
        "getCelebrityImages",
        this.$route.params.id
      );
      const { data } = await this.$store.dispatch("getCelebrities");
      this.popularCelebrities = data.results;
    },
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
    celebrityRaiting() {
      return this.celebrity.popularity;
    },
    celebrityRaitingColor() {
      if (this.celebrityRaiting < 100) {
        return "rgb(255, 80, 80)";
      }
      if (this.celebrityRaiting >= 100 && this.celebrityRaiting < 175) {
        return "rgb(252, 255, 80)";
      }
      if (this.celebrityRaiting >= 175) {
        return "rgb(150, 255, 80)";
      }
      return null;
    },
  },
  async created() {
    try {
      this.isLoading = true;
      await this.setRouteWatcher();
      await this.getCelebrityData();
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
    }
  },
};
</script>

<style lang="scss">
.celebrity-profile__back {
  background-color: rgba(63, 30, 121, 0.158);
}
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
    padding: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: inset 0px 0px 21px 0px rgb(0, 0, 0);
    transition: max-height cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  }
  .bio--active {
    max-height: 700px;
  }
}
.movie-raiting {
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
}
.movie-raiting__bar {
  width: 100%;
  height: 20px;
}
.movie-raiting__info {
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: white;
}
.movie-raiting__number {
  font-size: 1rem;
}
.movie-raiting__title {
  font-size: 1.2rem;
}
.celebrity-profile__image-container {
  display: flex;
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
}
</style>
