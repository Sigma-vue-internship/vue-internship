<template>
  <div>
    <SearchForm :mode="'optional'" @findMedia="findMedia" class="mt-5" />
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <ul v-if="!isLoading">
      <li v-for="media in searchMedia" :key="media.id">
        <SingleMovieSearch v-if="media.media_type === 'movie'" :movie="media" />
        <SingleCelebritySearch
          v-else-if="media.media_type === 'person'"
          :celebrity="media"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import SingleMovieSearch from "@/components/SingleMovieSearch.vue";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import SingleCelebritySearch from "@/components/SingleCelebritySearch.vue";
export default {
  data() {
    return {
      resData: null,
      routeSearchData: null,
      isLoading: false,
    };
  },
  components: {
    SearchForm,
    SingleMovieSearch,
    SpinnerLoader,
    SingleCelebritySearch,
  },
  computed: {
    searchMedia() {
      return this.resData && this.resData.data.results;
    },
  },
  methods: {
    async findMedia(searchData) {
      if (searchData.searchBy) {
        this.$router
          .push({
            path: "/search",
            query: {
              searchQuery: searchData.searchQuery,
              searchBy: searchData.searchBy,
              searchByValue: searchData.searchByValue,
            },
          })
          .catch(() => {});
        try {
          this.isLoading = true;
          this.resData = await this.$store.dispatch("findMedia", searchData);
          this.isLoading = false;
          return;
        } catch (e) {
          console.log(e);
          this.isLoading = false;
        }
      }
      if (searchData.searchQuery) {
        this.$router
          .push({
            path: "/search",
            query: {
              searchQuery: searchData.searchQuery,
            },
          })
          .catch(() => {});
        try {
          this.isLoading = true;
          this.resData = await this.$store.dispatch("findMedia", searchData);
          this.isLoading = false;
          return;
        } catch (e) {
          console.log(e);
          this.isLoading = false;
        }
      }
    },
  },
  async created() {
    this.routeSearchData = { ...this.$route.query };
    if (this.routeSearchData.searchQuery && !this.searchMedia) {
      try {
        this.isLoading = true;
        this.resData = await this.$store.dispatch(
          "findMedia",
          this.routeSearchData
        );
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.isLoading = false;
      }
    }
  },
};
</script>
<style lang="scss">
ul {
  padding: 0;
}
</style>