<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    :class="`fixed-top headerNavbar${getMode}`"
  >
    <div class="container">
      <Navbar>
        <div
          slot="toggle"
          class="form-check form-switch ms-auto d-flex flex-row justify-content-start"
        >
          <label
            class="form-check-label"
            for="lightSwitch"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              :fill="getMode==='dark' ? 'white' : 'black'"
              class="bi bi-brightness-high"
              viewBox="0 0 16 16"
            >
              <path
                d="
                M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0
                6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0
                8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8
                0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8
                13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1
                .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3
                8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1
                1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5
                0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5
                0 0 1.707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5
                0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0
                .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1
                1.707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"
              />
            </svg>
          </label>
          <input
            id="lightSwitch"
            class="form-check-input"
            type="checkbox"
            :checked="(getMode === 'dark') ? 'checked' : false"
            @change="toggle"
          >
        </div>
      </Navbar>
    </div>
  </b-navbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navbar from "./Navbar";
export default {
  name: "Header",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(["getMode"]),
  },
  methods: {
    ...mapActions(["setMode"]),
    toggle() {
      this.getMode === "dark" ? this.setMode("light") : this.setMode("dark");
    },
  },
};
</script>

<style lang="scss">
  #lightSwitch {
    margin-left: 10px;
  }
  .form-check {
    padding-left: 0!important;
  }
  .form-check-input {
    background-color: #eeeeee!important;
    margin-top: 0!important;
    height: 25px!important;
    width: 50px!important;
  }
  .form-switch .form-check-input {
    width: 2em;
  }
  .form-check-input:checked {
    box-shadow: none!important;
    border: none;
    background-color: #393939!important;
    border-color: rgb(137, 137, 137)!important;
  }
  .form-check-input:focus {
    box-shadow: none!important;
    border: none;
  }
  .headerNavbardark {
    background-color: rgba(33,37,41,255);
  }
  .headerNavbarlight {
    border-bottom: 1px solid gray;
    background-color: rgb(255, 255, 255);
    opacity: 1;
  }
</style>