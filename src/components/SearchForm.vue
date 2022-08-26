<template>
  <div class="search-form__container container">
    <div>
      <div
        class="
          search-form
          d-grid
          gap-2
          d-sm-flex
          justify-content-sm-center
          mb-2
        "
      >
        <b-form-input
          v-model="searchQuery"
          placeholder="Search for media"
          @keyup.enter="emitFindMovies"
        ></b-form-input>
        <b-form-input
          v-if="selected"
          v-model="searchByValue"
          :placeholder="selected"
          @keyup.enter="emitFindMovies"
        ></b-form-input>

        <button
          type="button"
          @click="emitFindMovies"
          class="btn btn-primary btn-lg px-4"
        >
          Search
        </button>
      </div>
      <div class="radio__container">
        <b-form-group
          class="radio-group__container"
          v-if="mode !== 'preview'"
          label="Please select an option"
        >
          <b-form-radio-group
            id="radio-group-1"
            class="d-flex gap-3"
            v-model="selected"
            :options="options"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        <div
          v-if="alertStatus"
          class="alert alert-warning p-2 text-start"
          role="alert"
        >
          {{ alertSign }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: () => "preview",
    },
  },
  data() {
    return {
      searchQuery: "",
      searchByValue: "",
      alertStatus: false,
      selected: null,
      options: [
        { value: null, text: "By film title" },
        { value: "region", text: "By region" },
      ],
    };
  },
  methods: {
    emitFindMovies() {
      if (this.searchQuery && !this.selected) {
        this.$emit("findMovies", this.searchData);
        if (this.alertStatus) this.showHideAlert();
        return;
      }
      if (this.searchQuery && this.searchByValue) {
        this.$emit("findMovies", this.searchData);
        if (this.alertStatus) this.showHideAlert();
        return;
      }
      if (!this.alertStatus) this.showHideAlert();
    },
    showHideAlert() {
      this.alertStatus = !this.alertStatus;
    },
  },
  computed: {
    searchData() {
      return {
        searchQuery: this.searchQuery,
        searchBy: this.selected,
        searchByValue: this.searchByValue.toLowerCase(),
      };
    },
    alertSign() {
      if (this.selected && !this.searchByValue) {
        return `To find movie or actor, you have to provide ${this.selected}`;
      }
      if (!this.searchQuery) {
        return `To find movie or actor, you have to provide name`;
      }
      return this.showHideAlert();
    },
  },
  created() {
    this.searchQuery = this.$route.query.searchQuery;
  },
};
</script>

<style lang="scss">
.radio__container {
  display: flex;
  justify-content: space-between;
  > .alert {
    flex-basis: 55%;
  }
}
.search-form {
  width: 100%;
}
.search-form__container {
  color: white;
  display: flex;
  flex-direction: column;
  height: 180px;
}
#radio-group-1 {
  > .custom-control-input {
    margin-right: 10px;
  }
}
</style>