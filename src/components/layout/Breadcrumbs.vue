<template>
  <b-breadcrumb class="container px-5 py-3" v-if="breadCrumbs.length">
    <b-breadcrumb-item
      class="breadcrumb"
      v-for="(crumb, i) in breadCrumbs"
      :key="`${crumb.label} ${i}`"
      :to="crumb.to"
      :active="i === breadCrumbs.length - 1"
      >{{ crumb.label }}</b-breadcrumb-item
    >
  </b-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      maxCrumbs: 5,
    };
  },
  watch: {
    $route: {
      handler({ meta: { breadCrumb }, fullPath }, prevRoute) {
        if (fullPath === "/") {
          this.breadCrumbs = [];
          return;
        }
        this.breadCrumbs.forEach((crumb, i) => {
          if (crumb.to === fullPath) {
            this.breadCrumbs = this.breadCrumbs.filter(
              (crumb, _, arr) => arr.indexOf(crumb) < i
            );
            return;
          }
        });
        if (
          prevRoute.fullPath === "/" &&
          fullPath !== "/" &&
          prevRoute.meta.breadCrumb
        ) {
          const prevRouteLabel = prevRoute.meta.breadCrumb[0].label;
          const prevRoutePath = prevRoute.fullPath;
          this.breadCrumbs.push({ label: prevRouteLabel, to: prevRoutePath });
        }
        this.breadCrumbs.push({ label: breadCrumb[0].label, to: fullPath });
        if (this.breadCrumbs.length === this.maxCrumbs)
          this.breadCrumbs.shift();
      },
      deep: true,
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
    span {
      color: $lightGreen;
    }
  }
}
</style>
