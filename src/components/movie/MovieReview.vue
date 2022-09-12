<template>
  <div class="card flex-row reviewElement">
    <img
      class="card-img-left img-responsive m-2"
      :src="review.author_details.avatar_path!==null ? checkImgPath : 'https://fomantic-ui.com/images/wireframe/image.png'"
      :alt="'Avatar' + review.author"
    >
    <div class="card-body flex-column py-2">
      <div class="row pb-2 authorData">
        <h5 class="card-title author">
          {{ review.author }}
        </h5>
        <p class="card-text date">
          {{ checkDateOfCreate }}
        </p>
      </div>
      <div class="reviewElement__content">
        <vue-show-more-text
          class="review"
          :text="review.content"
          :lines="5"
          additional-content-css="font-size:16px;"
          additional-content-expanded-css="font-size:16px;"
          additional-anchor-css="font-size: 16px;"
        />
      </div>
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
  computed: {
    checkImgPath() {
      if((this.review.author_details.avatar_path || "").includes('gravatar') && this.review.author_details.avatar_path!==null) {
        return this.review.author_details.avatar_path.slice(1);
      } else
        return 'https://image.tmdb.org/t/p/w185/' + this.review.author_details.avatar_path;
    },
    checkDateOfCreate() {
      const date = new Date(this.review.created_at);
      const dateCreate = ('0' + date.getDate()).slice(-2) + '.'
        + ('0' + (date.getMonth()+1)).slice(-2) + '.'
        + date.getFullYear();
      return dateCreate;
    },
  },
};
</script>

<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .reviewElement {
    background-color: rgba(74, 36, 141, 0.316);
    box-shadow: 8px 8px 24px 0 rgb(0, 0, 0);
    .authorData {
      flex-wrap: nowrap;
    }
    .card-img-left {
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }
    .card-title {
      color: white;
    }
    .author {
      width: fit-content;
      color: $lightGreen;
      font-weight: 700;
      margin-bottom: 0;
    }
    .date {
      width: fit-content;
      color: gray;
      justify-content: center;
      align-self: center;
    }
    &__content {
      padding: 0;
      overflow: hidden;
      .review {
        padding: 0;
      }
      .anchor {
        color: $lightGreen;
      }
    }
  }
  @media (max-width: 600px) {
  .reviewElement {
    flex-direction: column!important;
    .card-img-left {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
