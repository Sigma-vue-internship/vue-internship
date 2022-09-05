<template>
  <div class="container py-5 px-3">
    <div class="verified row d-flex justify-content-center text-center">
      <img
        class="verified__img col-12"
        src="../../assets/verified_success.png"
        alt="success image"
      />
      <h1 class="verified__title col-12">
        You have successfully verified your account !
      </h1>
      <div class="col-12 row d-flex flex-column align-items-center">
        <router-link class="col-sm-8 col-md-4 my-2" :to="'/profile'"
          ><button class="btn btn-dark w-100">Profile</button></router-link
        >
        <router-link class="col-sm-8 col-md-2 my-2" :to="'/'"
          ><button class="btn btn-dark w-100">Home</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
.verified {
  color: $lightGreen;
  a {
    display: block;
    color: white;
    text-decoration: none;
  }
  &__img {
    width: 100px;
    margin-bottom: 20px;
  }
  &__title {
    margin-bottom: 20px;
  }
}
</style>