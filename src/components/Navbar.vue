<template>
  <div class="w-100">
    <b-nav class="navbar p-2 px-4 navbar-light amber lighten-4 mb-1">
      <b-navbar-brand class="navbar-brand" to="/">Moviedesk</b-navbar-brand>
      <button
        class="navbar-toggler first-button"
        type="button"
        @click="showHideMenu"
      >
        <div :class="isMenuOpen ? 'animated-icon1 open' : 'animated-icon1'">
          <span></span><span></span><span></span>
        </div>
      </button>
      <div
        :class="
          isMenuOpen
            ? 'navbar-collapse d-flex justify-content-end navbar__burger navbar__open'
            : 'navbar-collapse d-flex justify-content-end navbar__burger'
        "
      >
        <ul v-if="isMenuOpen" class="navbar-nav">
          <li @click="showHideMenu">
            <b-nav-item to="/">Home</b-nav-item>
          </li>
          <li @click="showHideMenu">
            <b-nav-item to="/search">Search</b-nav-item>
          </li>
          <li @click="showHideMenu">
            <b-nav-item to="/login">Login</b-nav-item>
          </li>
        </ul>
      </div>
      <div class="navbar-collapse d-flex justify-content-end navbar__wide">
        <ul class="navbar-nav navbar__wide">
          <li>
            <b-nav-item to="/">Home</b-nav-item>
          </li>
          <li>
            <b-nav-item to="/search">Search</b-nav-item>
          </li>
          <li>
            <b-nav-item to="/login">Login</b-nav-item>
          </li>
        </ul>
      </div>
    </b-nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    showHideMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
.navbar__burger {
  height: 0;
  transition: height cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
}
.navbar__open {
  height: 120px;
}
@media (max-width: 992px) {
  .navbar__wide {
    opacity: 0;
    display: none;
    visibility: hidden;
  }
}
.navbar-toggler:focus {
  box-shadow: none;
}
.animated-icon1 {
  width: 30px;
  height: 20px;
  position: relative;
  margin: 0px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.animated-icon1 span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.animated-icon1 span {
  background: $lightGreen;
}

.animated-icon1 span:nth-child(1) {
  top: 0px;
}

.animated-icon1 span:nth-child(2) {
  top: 10px;
}

.animated-icon1 span:nth-child(3) {
  top: 20px;
}

.animated-icon1.open span:nth-child(1) {
  top: 11px;
  -webkit-transform: rotate(135deg);
  -moz-transform: rotate(135deg);
  -o-transform: rotate(135deg);
  transform: rotate(135deg);
}

.animated-icon1.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.animated-icon1.open span:nth-child(3) {
  top: 11px;
  -webkit-transform: rotate(-135deg);
  -moz-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  transform: rotate(-135deg);
}
.navbar-brand {
  color: white;
  font-weight: bold;
  font-size: 18px;
  &:hover {
    color: $lightGreen;
  }
  &:focus {
    color: white;
  }
}
.nav-link {
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  &:hover {
    color: $lightGreen;
  }
  &:focus {
    color: white;
  }
}
a.nav-link.router-link-exact-active.router-link-active {
  color: rgb(63, 123, 252);
}
</style>