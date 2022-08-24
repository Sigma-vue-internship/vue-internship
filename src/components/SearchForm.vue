<template>
  <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
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
      if (this.mode === "preview") {
        this.$emit("findMovies", {
          searchQuery: this.searchQuery,
          searchBy: null,
          searchByValue: "",
        });
        return;
      }
      this.$emit("findMovies", {
        searchQuery: this.searchQuery,
        searchBy: this.selected,
        searchByValue: this.searchByValue.toLowerCase(),
      });
    },
  },
};
</script>

<style>
</style>