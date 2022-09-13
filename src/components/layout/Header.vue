<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
    class="fixed-top"
  >
    <div class="container">
      <Navbar>
        <label
          slot="toggle"
          class="toggle"
          for="checkbox"
        >
          <input
            id="checkbox"
            type="checkbox"
            :checked="(mode === 'dark') ? 'checked' : false"
            @change="$emit('toggle')"
          >
          <span class="toggler round" />
        </label>
      </Navbar>
    </div>
  </b-navbar>
</template>

<script>
import Navbar from "./Navbar";
export default {
  name: "Header",
  components: {
    Navbar,
  },
  props: {
    mode: {
      type: String,
      default: "",
    },
    toggle: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss">
  .toggle {
    position: absolute;
    z-index: 3;
    display: inline-block;
    width: 46px;
    height: 20px;
    left: 5px;
    top: 5px;
  }
  .toggle input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .toggler {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #b4b4b4;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .toggler:before {
    position: absolute;
    content: "";
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background: rgb(42, 42, 42);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .toggler {
    background: #393939;
  }
  input:focus + .toggler {
    box-shadow: 0 0 2px #d6d8d9;
  }
  input:checked + .toggler:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  .toggler.round {
    border-radius: 34px;
  }
  .toggler.round:before {
    border-radius: 50%;
  }
  @media (max-width: 600px) {
    .toggle {
      width: 30px;
      height: 15px;
    }
    .toggler:before {
      content: "";
      height: 7px;
      width: 7px;
    }
    input:checked + .toggler:before {
      -webkit-transform: translateX(15px);
      -ms-transform: translateX(15px);
      transform: translateX(15px);
    }
  }
</style>