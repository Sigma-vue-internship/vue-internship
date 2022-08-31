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
        <div class="jumbotron">
          <h1 class="display-4" v-if="mode !== 'preview'">Find media</h1>
          <div class="d-flex search-form__filters">
            <b-form-input
              v-model="searchQuery"
              placeholder="Search for media"
              @keyup.enter="emitFindMedia"
            ></b-form-input>
            <b-form-input
              v-if="selected"
              v-model="searchByValue"
              :placeholder="selected"
              @keyup.enter="emitFindMedia"
            ></b-form-input>
          </div>
          <hr class="my-4" />
          <div class="d-flex justify-content-between">
            <p class="search-form__filters-info">
              This is a multi-search, here you can find movies or actors
            </p>
            <p class="lead px-2">
              <button
                type="button"
                @click="emitFindMedia"
                class="btn btn-dark btn-lg px-4 search-btn"
              >
                Search
              </button>
            </p>
          </div>
        </div>
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
      </div>
    </div>
    <notifications
      classes="search-notification"
      group="search"
      position="top right"
    >
      <template slot="body">
        <div class="alert alert-warning p-2 text-start m-2" role="alert">
          {{ alertSign }}
        </div>
      </template>
    </notifications>
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
        { value: null, text: "By film title" },
        { value: "region", text: "By region" },
      ],
    };
  },
  methods: {
    emitFindMedia() {
      if (this.searchQuery && !this.selected) {
        this.$emit("findMedia", this.searchData);
        this.$notify({
          group: "search",
          clean: true,
        });
        return;
      }
      if (this.searchQuery && this.searchByValue) {
        this.$emit("findMedia", this.searchData);
        this.$notify({
          group: "search",
          classes: "search-notification",
          clean: true,
        });
        return;
      }
      this.$notify({ group: "search" });
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
      return `To find movie or actor, you have to provide name`;
    },
  },
  created() {
    this.searchQuery = this.$route.query.searchQuery;
  },
};
</script>

<style lang="scss">
.jumbotron {
  width: 100%;
  text-align: start;
  .search-form__filters {
    width: 100%;
    gap: 10px;
  }
}
@media (max-width: 576px) {
  .jumbotron {
    width: 100%;
    .search-form__filters {
      width: 100%;
      gap: 10px;
    }
    .lead {
      display: flex;
      max-height: 50px;
    }
  }
}
.search-notification {
  margin-left: 100px;
}
.radio__container {
  display: flex;
  justify-content: space-between;
}
.search-form {
  width: 100%;
  .btn {
    background-color: rgba(26, 11, 53, 0.682)!important;
    border-color:rgba(0, 0, 0, 0.316)!important;
  }
}
.search-form__container {
  color: white;
  display: flex;
  flex-direction: column;
}
#radio-group-1 {
  > .custom-control-input {
    margin-right: 10px;
  }
}
</style>