<template>
  <b-carousel
    controls
    no-animation
    style="box-shadow: 8px 8px 24px 0px rgb(0, 0, 0)"
  >
    <!-- Text slides with image -->
    <b-carousel-slide
      v-for="(url, i) in imgUrls"
      :key="i"
      :img-src="url"
    ></b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  props: {
    imgUrls: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.carousel-inner .carousel-item img {
  border-radius: 10px;
}
</style>