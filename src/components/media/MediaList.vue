<template>
  <div class="container pt-5 d-flex flex-column align-items-center">
    <div class="text-start text-white w-100 py-3">
      <h2>{{ title }}</h2>
    </div>
    <b-container class="scroll d-flex flex-row">
      <ul
        v-if="elements.length"
        class="list d-flex flex-row"
      >
        <li
          v-for="element in elements"
          :key="element.uuid"
        >
          <SingleMediaElementList
            :element="element"
            @click.native="routeToElementPage(element.id)"
          />
        </li>
      </ul>
      <div
        v-if="changePage"
        v-intersection="changePage"
      />
    </b-container>
  </div>
</template>

<script>
import SingleMediaElementList from "./SingleMediaElementList";
export default {
  name: "MediaList",
  components: {
    SingleMediaElementList,
  },
  props: {
    title: String,
    elements: Array,
    changePage: Function,
    route: String,
  },
  methods: {
    routeToElementPage(id) {
      this.$router.push({ path: `${this.route}${id}` }).catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";
.scroll {
  overflow-x: auto;
  overflow-y: hidden;
  padding-left: 0;
}
.scroll::-webkit-scrollbar {
  height: 30px;
}
.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px black;
  -webkit-box-shadow: inset 0 0 6px black;
  border-radius: 20px;
}
.scroll::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: $lightGreen;
  box-shadow: inset 0 0 6px black;
  -webkit-box-shadow: inset 0 0 6px black;
}
.list {
  padding-left: 0 !important;
}
</style>
