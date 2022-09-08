<!-- eslint-disable comma-dangle -->
<template>
  <div class="search-form__container container">
    <div>
      <div class="search-form">
        <div v-if="mode !== 'preview'" class="jumbotron">
          <h1 class="display-4">Find media</h1>
          <div
            class="
              d-grid d-sm-flex
              justify-content-sm-center
              search-form__filters
              input-group-lg
            "
          >
            <b-form-input
              v-model="searchQuery"
              placeholder="Search for media"
              @keyup.enter="emitFindMedia"
            />
            <b-form-select
              v-if="selected"
              v-model="searchByValue"
              :options="regionOptions"
            />
          </div>
          <div class="d-flex justify-content-between">
            <div class="radio__container">
              <b-form-group
                class="radio-group__container"
                label="Please select an option"
              >
                <b-form-radio-group
                  id="radio-group-1"
                  v-model="selected"
                  class="radio-btns d-flex gap-3"
                  :options="options"
                  name="radio-options"
                />
              </b-form-group>
            </div>
            <p class="lead">
              <button
                type="button"
                class="btn btn-dark btn-lg px-4 search-btn"
                @click="emitFindMedia"
              >
                Search
              </button>
            </p>
          </div>
          <hr class="my-4" />

          <div class="d-flex justify-content-between">
            <p class="search-form__filters-info">
              This is a multi-search, here you can find movies or actors
            </p>
          </div>
        </div>
        <div v-if="mode === 'preview'" class="jumbotron">
          <div
            class="
              d-grid d-sm-flex
              justify-content-sm-center
              search-form__filters
              input-group-lg
            "
          >
            <b-form-input
              v-model="searchQuery"
              placeholder="Type movie or actor title here"
              class="my-2 input-lg"
              @keyup.enter="emitFindMedia"
            />
            <b-form-input
              v-if="selected"
              :placeholder="selected"
              class="input-lg"
              @keyup.enter="emitFindMedia"
            />
            <button
              type="button"
              class="btn btn-dark px-4 search-btn my-2"
              @click="emitFindMedia"
            >
              Search
            </button>
          </div>
        </div>
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
  name: "SearchForm",
  props: {
    mode: {
      type: String,
      default: () => "preview",
    },
    regions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      searchQuery: "",
      searchByValue: null,
      selected: null,
      options: [
        { value: null, text: "By film title" },
        { value: "region", text: "By region" }
      ],
    };
  },
  computed: {
    regionOptions() {
      if (this.mode !== "preview") {
        return this.regions.map((reg, i) =>
          i !== 0
            ? { value: reg.iso_3166_1, text: reg.english_name }
            : { value: null, text: "-- Please select a region --" }
        );
      }
      return [];
    },
    searchData() {
      return {
        searchQuery: this.searchQuery,
        searchBy: this.selected,
        searchByValue: this.searchByValue && this.searchByValue.toUpperCase(),
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
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
.radio-group__container {
  font-size: 18px;
  #radio-group-1 {
    .custom-radio {
      display: flex;
      align-items: center;
    }
  }
}
.custom-control-input {
  width: 25px;
  height: 25px;
  margin-right: 7px;
}
.jumbotron {
  width: 100%;
  text-align: start;
  .search-form__filters {
    width: 100%;
    margin-bottom: 15px;
    gap: 10px;
    .custom-select {
      padding: 0.5rem 0rem;
      border-radius: 0.5rem;
      background-color: $lightGreen;
      color: black;
      font-size: 1.25rem;
      option {
        background-color: white;
        font-size: 1.1rem;
      }
    }
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
    background-color: rgba(26, 11, 53, 0.682);
    border-color: rgba(0, 0, 0, 0.316) !important;
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