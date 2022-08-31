<template>
  <div class="elements">
    <div class="elements__title">
      <p>{{ title }}</p>
    </div>
    <div class="elements__scroll">
      <ul class="elements__list" v-if="elements.length">
        <SingleMediaElementList
          :element="element"
          v-for="element in elements"
          :key="element.id"
          @click.native="routeToElementPage(element.id)"
        />
      </ul>
      <div v-intersection="changePage"></div>
    </div>
  </div>
</template>

<script>
import SingleMediaElementList from "./SingleMediaElementList";
export default {
  name: "MediaList",
  props: {
    title: String,
    elements: Array,
    changePage: Function,
    route: String,
  },
  components: {
    SingleMediaElementList,
  },
  methods: {
    routeToElementPage(id) {
      this.$router.push({ path: `${this.route}${id}` }).catch(() => {});
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
.elements {
  @include flex-center(column);
  margin-top: 25px;
  &__title {
    color: white;
    font-weight: 700;
    margin-top: 20px;
    font-size: 36px;
    width: 1100px;
    p {
      width: 300px;
      align-self: flex-start;
    }
  }
  &__scroll {
    height: 434px;
    width: 1100px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__scroll::-webkit-scrollbar {
    height: 30px;
  }
  &__scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px $lightPurple;
    border-radius: 20px;
  }
  &__scroll::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: $darkPurple;
    -webkit-box-shadow: inset 0 0 6px $lightPurple;
  }
  &__list {
    display: flex;
    flex-direction: row;
    padding-left: 0;
  }
}
.elements:last-child {
  margin-bottom: 30px;
}

@media (max-width: 992px) and (min-width: 376px) {
  .elements {
    margin-top: 10px;
    &__title {
      font-size: 30px;
      width: 100%;
      p {
        width: 100%;
        align-self: center;
      }
    }
    &__scroll {
      height: 350px;
      width: 645px;
    }
    &__list {
      padding-left: 0;
    }
    &__scroll::-webkit-scrollbar {
      height: 25px;
    }
  }
}

@media (max-width: 375px) {
  .elements {
    margin-top: 10px;
    &__title {
      font-size: 25px;
      width: 100%;
      p {
        width: 100%;
        align-self: center;
      }
    }
    &__scroll {
      height: 250px;
      width: 320px;
    }
    &__list {
      width: 100%;
    }
    &__scroll::-webkit-scrollbar {
      height: 20px;
    }
  }
}
</style>
