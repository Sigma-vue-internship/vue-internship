<template>
  <li>
    <b-card
      text-variant="white"
      :img-src="'https://image.tmdb.org/t/p/w185/' + imgPath"
      :title="name"
      class="element"
    >
    </b-card>
  </li>
</template>
  
<script>
export default {
  name: "SingleMediaElementList",
  props: {
    element: Object
  },
  data() {
    return {
      imgPath: "",
      name: ""
    }
  },
  mounted() {
    if('profile_path' in this.element){
      this.imgPath = this.element.profile_path;
    } else if('poster_path' in this.element){
      this.imgPath = this.element.poster_path;
    }

    if('name' in this.element){
      this.name = this.element.name;
    } else if('title' in this.element){
      this.name = this.element.title;
    }
  }
}
</script>
  
<style scoped lang="scss">
  @import "../assets/scss/variables.scss";
  .element {
    height: 292px;
    width: 200px;
    margin-right: 25px;
    border-radius: 0;
    border: 10px solid $lightPurple;
    background-color: $lightPurple;
  }
  .card-img, .card-img-bottom { 
    border: none;
    border-radius: 10px;
    box-shadow: 8px 8px 24px 0px rgb(0 0 0);
  }

  @media (max-width: 992px) and (min-width: 376px) {
    .element {
      height: 269px;
      width: 150px;
      margin-right: 15px;
      overflow: hidden;
    }
    .card-title {
      font-size: 16px;
    }
    .card-img, .card-img-bottom { 
      border-radius: 0;
    }
  }

  @media (max-width: 375px) {
    .element {
      height: 185px;
      width: 100px;
      margin-right: 12px;
      overflow: hidden;
    }
    .card-title {
      font-size: 12px;
    }
    .card-img, .card-img-bottom { 
      border-radius: 0;
    }
  }
</style>
  