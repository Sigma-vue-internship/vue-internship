<template>
  <li>
    <b-card
      text-variant="white"
      :img-src="'https://image.tmdb.org/t/p/w185/' + img"
      :title="caption"
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
  computed: {
    img(){
      return ('profile_path' in this.element) ? this.element.profile_path
        : ('poster_path' in this.element) ? this.element.poster_path
          : "";
    },
    caption(){
      return ('name' in this.element) ? this.element.name
        : ('title' in this.element) ? this.element.title
          : "";
    }
  }
}
</script>
  
<style scoped lang="scss">
  @import "../assets/scss/variables.scss";
  .element {
    height: 360px;
    width: 200px;
    margin-right: 25px;
    border-radius: 0;
    border: 0;
    background: transparent;
  }
  .card-img, .card-img-bottom { 
    border: 10px solid rgb(97, 47, 183);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
  }
  .card-title {
    height: 60px;
    overflow: hidden;
  }

  @media (max-width: 992px) and (min-width: 376px) {
    .element {
      height: 269px;
      width: 150px;
      margin-right: 15px;
    }
    .card-title {
      height: 40px;
      font-size: 16px;
    }
    .card-img, .card-img-bottom { 
      border-radius: 0;
      border: 7px solid rgb(97, 47, 183);
    }
  }

  @media (max-width: 375px) {
    .element {
      height: 185px;
      width: 100px;
      margin-right: 12px;
    }
    .card-title {
      height: 30px;
      font-size: 12px;
    }
    .card-img, .card-img-bottom { 
      border-radius: 0;
      border: 5px solid rgb(97, 47, 183);
    }
  }
</style>
  