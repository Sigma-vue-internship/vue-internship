<template>
  <li>
    <b-card
      text-variant="white"
      :img-src="'https://image.tmdb.org/t/p/w185/' + celebrity.profile_path"
      :title="celebrity.name"
      title-bottom
      class="celebrity"
    >
    </b-card>
  </li>
</template>
  
<script>
export default {
  name: "SingleCelebrityElementList",
  props: {
    celebrity: Object
  }
}
</script>
  
<style scoped lang="scss">
  @import "../assets/scss/variables.scss";
  .celebrity {
    height: 290px;
    width: 200px;
    margin-right: 25px;
    border: 10px solid $lightPurple;
  }
  .card-img, .card-img-bottom { 
    border: none;
    border-radius: 0;
  }
</style>
  