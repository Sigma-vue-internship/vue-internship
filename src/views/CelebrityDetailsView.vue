<template>
  <div class="celebrity-profile__back">
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <div
      v-else
      class="
        container
        d-flex
        flex-column
        align-items-between
        justify-content-center
        p-4
      "
    >
      <div class="row gx-0 py-4 d-flex">
        <div
          class="celebrity-profile__image-container col-lg-5 col-xl-5"
          :class="{ 'justify-content-center': !celebrityImages.length }"
        >
          <div class="d-flex flex-column px-4">
            <img
              class="celebrity-profile__image img-fluid"
              :src="selectedImg ? selectedImg : profilePath"
              alt="celebrity profile image"
            />
            <Rating
              class="celebrity__rating"
              v-if="celebrityRating"
              :celebrityRating="celebrityRating"
            />
          </div>
          <div
            v-if="celebrityImages.length"
            class="celebrity-profile__preview-container"
          >
            <img
              v-for="(celImg, i) in celebrityImages"
              :key="`celelebrity_img ${i}`"
              class="celebrity-profile__preview-img img-fluid"
              :src="celImg"
              @click="selectImg(celImg, i)"
             alt=""/>
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
            />
          </p>
        </div>
      </div>
      <MediaList
        v-if="celebrityMovies.length"
        title="Actor's movies"
        route="/movie/"
        :elements="celebrityMovies"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vueShowMoreText from "vue-show-more-text";
import SpinnerLoader from "@/components/common/SpinnerLoader";
import MediaList from "@/components/media/MediaList";
import Rating from "@/components/common/Rating";
export default {
  components: { SpinnerLoader, vueShowMoreText, MediaList, Rating },
  data() {
    return {
      celebrity: null,
      selectedImg: "",
      prevSelectedImg: "",
      prevIndex: null,
      resImagesData: null,
      resPopularCelebrities: null,
      celebrityMovies: [],
      maxMoviesToShow: 25,
      isLoading: false,
    };
  },
  methods: {
    ...mapActions([
      "findSingleCelebrity",
      "getCelebrityImages",
      "getCelebrityMovies",
    ]),
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
    async getCelebrityData() {
      const { data }  = await this.findSingleCelebrity(this.$route.params.id);
      this.celebrity = data;
      this.resImagesData = await this.getCelebrityImages(this.$route.params.id);
      const { data: { cast } } = await this.getCelebrityMovies(this.$route.params.id);
      this.celebrityMovies = cast.length > this.maxMoviesToShow ?  cast.slice(0, this.maxMoviesToShow) : cast;
    },
  },
  computed: {
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
        : "https://dummyimage.com/300x450/000/00ff8c";
    },
    celebrityRating() {
      return Math.floor(this.celebrity.popularity);
    },
  },
  async created() {
    try {
      this.isLoading = true;
      await this.getCelebrityData();
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      console.error(e);
    }
  },
};
</script>

<style lang="scss">
.celebrity__rating {
  margin: 0 auto;
}
.celebrity-profile__back {
  background-color: rgba(63, 30, 121, 0.158);
}
.celebrity-profile__info {
  position: relative;
  padding: 40px 40px 80px 40px;
  background-color: rgba(74, 36, 141, 0.316);
  box-shadow: 8px 8px 24px 0 rgb(0, 0, 0);
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
    box-shadow: inset 0 0 21px 0 rgb(0, 0, 0);
    transition: max-height cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  }
  .bio--active {
    max-height: 700px;
  }
}
.celebrity-profile__image-container {
  display: flex;
  margin-bottom: 20px;
  .celebrity-profile__preview-container {
    display: flex;
    flex-direction: column;

    padding-right: 10px;
  }
  .celebrity-profile__image {
    box-shadow: 8px 8px 24px 0 rgb(0, 0, 0);
    align-self: flex-start;
    width: 300px;
    border-radius: 10px;
    display: block;
  }
  .celebrity-profile__preview-img {
    width: 125px;
    margin-bottom: 10px;
    border-radius: 10px;
    opacity: 0.7;
    box-shadow: 8px 8px 24px 0 rgb(0, 0, 0);
    cursor: pointer;
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
@media (max-width: 992px) {
  .celebrity-profile__image-container {
    justify-content: center;
  }
}
</style>
