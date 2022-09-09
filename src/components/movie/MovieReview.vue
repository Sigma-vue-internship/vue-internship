<template>
  <div class="card reviewElement">
    <div class="card-body">
      <img
        v-if="review.author_details.avatar_path !== null"
        class="card-img mb-2"
        :src="imgPath"
        :alt="'Avatar' + review.author"
      >
      <h5 class="card-title">
        {{ review.author }}
      </h5>
      <p class="card-text date">
        {{ review.created_at | moment("dddd, MMMM Do YYYY") }}
      </p>
      <vue-show-more-text
        :text="review.content"
        :lines="5"
        additional-content-css="font-size:16px;"
        additional-content-expanded-css="font-size:16px;"
        additional-anchor-css="font-size: 16px;"
        class="card-text content"
      />
    </div>
  </div>
</template>

<script>
import vueShowMoreText from "vue-show-more-text";
export default {
  name: "MovieReview",
  components: {
    vueShowMoreText,
  },
  props: {
    review: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      imgPath: "",
    };
  },
  created() {
    this.checkImgPath();
  },
  methods: {
    checkImgPath() {
      this.imgPath = this.review.author_details.avatar_path;
      (this.imgPath || "").includes('gravatar') && this.imgPath!==null
        ? this.imgPath = this.imgPath.slice(1)
        : this.imgPath = 'https://image.tmdb.org/t/p/w185/' + this.imgPath;
    },
  },
};
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .reviewElement {
    background-color: rgba(74, 36, 141, 0.316);
    box-shadow: 8px 8px 24px 0 rgb(0, 0, 0);
    .card-img {
      height: 50px;
      width: 50px;
    }
    .card-title {
      color: white;
    }
    .card-text {
      a {
        text-decoration: none;
        color: rgb(127, 107, 167);
      }
    }
    .date {
      color: gray;
    }
    .content {
      padding: 0;
    }
  }
</style>
