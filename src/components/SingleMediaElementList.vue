<template>
  <li>
    <b-card
      text-variant="white"
      :img-src="
        imgPath
          ? 'https://image.tmdb.org/t/p/w185/' + imgPath
          : 'https://dummyimage.com/300x450/000/00ff8c'
      "
      :title="captionElement"
      class="element"
    >
    </b-card>
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
@import "../assets/scss/variables.scss";
@import "../assets/scss/carusel-responsive.scss";
.element {
  height: $cardHeight;
  width: $cardWidth;
  margin-right: 15px;
  border-radius: 0;
  border: 0;
  background: transparent;
}
.card-img,
.card-img-bottom {
  border: 10px solid rgb(97, 47, 183);
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  transition: border cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  &:hover {
    border-color: $lightGreen;
  }
}
.card-title {
  height: 60px;
  overflow: hidden;
}
</style>
