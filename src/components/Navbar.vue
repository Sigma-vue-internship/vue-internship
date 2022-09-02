<template>
  <div class="w-100">
    <b-nav class="p-2 justify-content-between">
      <b-navbar-brand class="d-flex align-self-center mx-4" to="/"
        >Moviedesk</b-navbar-brand
      >
      <div class="d-flex">
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/search">Search</b-nav-item>
        <b-nav-item to="/user/login">Login</b-nav-item>
      </div>
    </b-nav>
  </div>
</template>

<style lang="scss" scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 18px;
}
.nav-link {
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
a.nav-link.router-link-exact-active.router-link-active {
  color: rgb(63, 123, 252);
}
</style>