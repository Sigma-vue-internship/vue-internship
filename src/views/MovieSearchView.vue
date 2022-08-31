<template>
  <div>
    <SearchForm :mode="'optional'" @findMedia="findMedia" class="mt-5" />
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <ul class="search__results-list" v-if="searchMedia.length">
      <li v-for="media in searchMedia" :key="media.media_type + ' ' + media.id">
        <SingleMovieSearch v-if="media.media_type === 'movie'" :movie="media" />
        <SingleCelebritySearch
          v-else-if="media.media_type === 'person'"
          :celebrity="media"
        />
      </li>
    </ul>
    <notifications
      classes="search-notification"
      group="empty-search"
      position="top right"
    >
      <template slot="body">
        <div class="alert alert-warning p-2 text-start m-2" role="alert">
          Not found any result
        </div>
      </template>
    </notifications>
    <div
      v-show="searchMedia.length && !isLoading"
      v-intersection="loadMoreMedia"
    ></div>
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
      searchMedia: [],
      resData: null,
      currentPage: 1,
      totalPages: null,
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
  methods: {
    async loadMoreMedia() {
      const routeSearchData = { ...this.$route.query };
      this.currentPage += 1;
      if (this.currentPage <= this.totalPages) {
        routeSearchData.page = this.currentPage;
        try {
          this.isLoading = true;

          const res = await this.$store.dispatch(
            "loadMoreMedia",
            routeSearchData
          );
          const updatedMedia = res.data.results;
          this.searchMedia = [...this.searchMedia, ...updatedMedia];
          this.isLoading = false;
        } catch (e) {
          this.isLoading = false;
          console.log(e);
        }
      }
    },
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
          if (this.resData.data.results.length === 0) {
            console.log(1);
            this.$notify({
              group: "empty-search",
              classes: "search-notification",
            });
          }
          this.searchMedia = this.resData.data.results;
          this.totalPages = this.resData.data.total_pages;
          this.isLoading = false;
          this.currentPage = 1;
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
          if (this.resData.data.results.length === 0) {
            this.$notify({
              group: "empty-search",
              classes: "search-notification",
            });
          }
          this.searchMedia = this.resData.data.results;
          this.totalPages = this.resData.data.total_pages;
          this.isLoading = false;
          this.currentPage = 1;
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
    this.currentPage = 1;
    if (this.routeSearchData.searchQuery && !this.searchMedia.length) {
      try {
        this.isLoading = true;
        this.resData = await this.$store.dispatch(
          "findMedia",
          this.routeSearchData
        );
        if (this.resData.data.results.length === 0) {
          this.$notify({
            group: "empty-search",
            classes: "search-notification",
          });
        }
        this.searchMedia = this.resData.data.results;
        this.totalPages = this.resData.data.total_pages;
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
.search__results-list {
  padding-top: 30px;
}
</style>