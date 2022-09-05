<template>
  <li>
    <div class="card">
      <img 
      class="card-img-top"
      alt="Card img"
      :src="
        imgPath
          ? 'https://image.tmdb.org/t/p/w185/' + imgPath
          : 'https://dummyimage.com/300x450/000/00ff8c'
        "
      />
      <div class="card-body">
        <h5 class="card-title">{{ captionElement }}</h5>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "SingleMediaElementList",
  props: {
    element: Object,
  },
  computed: {
    imgPath() {
      return "profile_path" in this.element
        ? this.element.profile_path
        : "poster_path" in this.element
        ? this.element.poster_path
        : "";
    },
    captionElement() {
      return "name" in this.element
        ? this.element.name
        : "title" in this.element
        ? this.element.title
        : "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/carusel-responsive.scss";
.card {
  background: transparent;
  border: none;
  color: white;
  margin-right: 15px;
}
.card-img,
.card-img-top {
  border: 10px solid rgb(97, 47, 183);
  box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.69);
  cursor: pointer;
  transition: border cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  height: $imgHeight;
  width: $imgWidth;
  border-radius: 5px;
  &:hover {
    border-color: $lightGreen;
  }
}
.card-title {
  height: 50px;
  overflow: hidden;
}
</style>
