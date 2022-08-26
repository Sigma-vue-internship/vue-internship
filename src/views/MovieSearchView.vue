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
import { mapGetters } from "vuex";
import SpinnerLoader from "@/components/SpinnerLoader.vue";
import SingleCelebritySearch from "@/components/SingleCelebritySearch.vue";
export default {
  data() {
    return {
      searchMedia: [],
      routeSearchData: null,
    };
  },
  components: {
    SearchForm,
    SingleMovieSearch,
    SpinnerLoader,
    SingleCelebritySearch,
  },
  computed: {
    ...mapGetters({
      isLoading: "getLoadingStatus",
    }),
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
        this.searchMedia = await this.$store.dispatch("findMedia", searchData);
        return;
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
        this.searchMedia = await this.$store.dispatch("findMedia", searchData);
        return;
      }
    },
  },
  async created() {
    this.routeSearchData = { ...this.$route.query };
    if (this.routeSearchData && !this.searchMedia.length) {
      this.searchMedia = await this.$store.dispatch(
        "findMedia",
        this.routeSearchData
      );
    }
  },
};
</script>
<style lang="scss">
ul {
  padding: 0;
}
</style>