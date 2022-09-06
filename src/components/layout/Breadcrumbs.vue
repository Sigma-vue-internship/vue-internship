<template>
  <b-breadcrumb class="container px-3 py-3" v-if="breadCrumbs">
    <b-breadcrumb-item
      class="breadcrumb"
      v-for="(crumb, i) in breadCrumbs"
      :key="`${crumb.label} ${i}`"
      :to="crumb.to"
      :active="i === breadCrumbs.length - 1 ? true : false"
      >{{ crumb.label }}</b-breadcrumb-item
    >
  </b-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadCrumbs() {
      if (typeof this.$route.meta.breadCrumb === "function") {
        return this.$route.meta.breadCrumb.call(this, this.$route);
      }
      return this.$route.meta.breadCrumb;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.breadcrumb {
  --bs-breadcrumb-margin-bottom: 0;
  --bs-breadcrumb-divider-color: 0;
  padding: 5px 0 0 5px;
  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.596);
    &:hover {
      color: $lightGreen;
    }
  }
  .active {
    color: $lightGreen;
  }
}
</style>