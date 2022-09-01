<template>
  <li>
    <b-card
      text-variant="white"
      :img-src="img 
        ? 'https://image.tmdb.org/t/p/w185/' + img 
        : 'https://d3aa3603f5de3f81cb9fdaa5c591a84d5723e3cb.hosting4cdn.com/wp-content/uploads/2020/11/404-poster-not-found-CG17701-1.png'"
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
    height: $cardHeight; 
    width: $cardWidth;
    margin-right: 15px;
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
  @media (max-width: 1400px) and (min-width: 991px) {
    .element {
      height: $cardHeight*0.85;
      width: $cardWidth*0.85;
    }
  }
  @media (max-width: 990px) and (min-width: 768px) {
    .element {
      height: $cardHeight*0.79;
      width: $cardWidth*0.79;
    }
  }
  @media (max-width: 767px) and (min-width: 576px) {
    .element {
      height: $cardHeight*0.78;
      width: $cardWidth*0.78;
    }
  }
  @media (max-width: 575px) {
    .element {
      height: $cardHeight*0.70;
      width: $cardWidth*0.70;
    }
  }
</style>
  