<template>
  <div>
    <b-nav class="p-2 justify-content-between">
      <b-nav-item to="/">Home</b-nav-item>
      <div class="d-flex">
        <b-nav-item to="/search">Search</b-nav-item>
        <b-nav-item to="/user/signup">Sign up</b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<style lang="scss" scoped>
.nav-link {
  font-weight: 400;
  color: rgba(0, 0, 0, 0.747);
}
a.nav-link.router-link-exact-active.router-link-active {
  color: rgb(0, 61, 194);
}
</style>