<template>
  <div class="not-found d-flex align-items-center justify-content-center py-4">
    <div class="text-center">
      <h1 class="display-1 fw-bold">
        404
      </h1>
      <p class="fs-3">
        <span class="text-danger">Opps!</span> Page not found.
      </p>
      <p class="lead">
        The page you’re looking for doesn’t exist.
      </p>
      <router-link
        :to="'/'"
        class="not-found__btn btn btn-primary"
      >
        Go Home
      </router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";
.not-found{
  color:white;
  &__btn{
    background: $darkPurple;
    border-color: transparent;
    &:hover{
      background: $lightPurple;
      border-color:transparent;
    }
  }
}
</style>