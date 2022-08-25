<template>
  <div style="height: 120px">
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-2">
      <b-form-input
        v-model="searchQuery"
        placeholder="Search for films"
        @keyup.enter="emitFindMovies"
      ></b-form-input>
      <b-form-input
        v-if="selected"
        v-model="searchByValue"
        :placeholder="selected"
        @keyup.enter="emitFindMovies"
      ></b-form-input>
      <b-form-select
        v-if="mode !== 'preview'"
        v-model="selected"
        :options="options"
        size="sm"
      ></b-form-select>
      <button
        type="button"
        @click="emitFindMovies"
        class="btn btn-primary btn-lg px-4 me-sm-3"
      >
        Search
      </button>
    </div>
    <div
      v-if="alertStatus"
      class="alert alert-warning p-2 text-start"
      role="alert"
    >
      {{ alertSign }}
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
        { value: null, text: "Please select an option", disabled: true },
        { value: null, text: "By film title" },
        { value: "region", text: "By region" },
        { value: "year", text: "By year" },
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
        return `To find movies, you have to provide movie ${this.selected}`;
      }
      if (!this.searchQuery) {
        return `To find movies, you have to provide movie title`;
      }
      return this.showHideAlert();
    },
  },
  created() {
    this.searchQuery = this.$route.query.searchQuery;
  },
};
</script>

<style>
</style>