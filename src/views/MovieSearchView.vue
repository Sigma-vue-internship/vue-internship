<template>
  <div>
    <SearchForm
      :mode="'optional'"
      :regions="regions"
      class="p-3"
      @findMedia="findMediaElements"
    />
    <SpinnerLoader
      v-if="isLoading"
      :is-loading="isLoading"
    />
    <ul
      v-if="searchMedia.length"
      class="search__results-list"
    >
      <li
        v-for="media in searchMedia"
        :key="media.uuid"
      >
        <SingleMovieSearch
          v-if="media.media_type === 'movie'"
          :movie="media"
        />
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
        <div
          class="alert alert-warning p-2 text-start m-2"
          role="alert"
        >
          Not found any result
        </div>
      </template>
    </notifications>
    <div
      v-show="searchMedia.length && !isLoading"
      v-intersection="loadMoreMediaElements"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SearchForm from "../components/common/SearchForm";
import SingleMovieSearch from "../components/movie/SingleMovieSearch";
import SpinnerLoader from "../components/common/SpinnerLoader";
import SingleCelebritySearch from "../components/celebrity/SingleCelebritySearch";
export default {
  name: "MovieSearchView",
  components: {
    SearchForm,
    SingleMovieSearch,
    SpinnerLoader,
    SingleCelebritySearch,
  },
  data() {
    return {
      searchMedia: [],
      resData: null,
      regions: [],
      currentPage: 1,
      totalPages: null,
      routeSearchData: null,
      isLoading: false,
      notifyData: {
        group: "error",
        type: "error",
        title: "Error message",
        text: error.message,
      },
    };
  },
  watch: {
    $route: {
      async handler(newRoute) {
        this.routeSearchData = { ...newRoute.query };
      },
      deep: true,
    },
  },
  async created() {
    try {
      this.isLoading = true;
      this.routeSearchData = { ...this.$route.query };
      this.searchData(this.routeSearchData);
      const {
        data: { results },
      } = await this.getRegions();
      this.regions = results;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.$notify({
        group: "error",
        type: "error",
        title: "Error message",
        text: error.message,
      });
    }
  },
  methods: {
    ...mapActions(["loadMoreMedia", "findMedia", "getRegions"]),
    async loadMoreMediaElements() {
      const routeSearchData = { ...this.$route.query };
      this.currentPage += 1;
      if (this.currentPage <= this.totalPages) {
        routeSearchData.page = this.currentPage;
        try {
          this.isLoading = true;
          const res = await this.loadMoreMedia(routeSearchData);
          const updatedMedia = res.data.results;
          this.searchMedia = [...this.searchMedia, ...updatedMedia];
          this.isLoading = false;
          console.log(this.notifyData);
        } catch (error) {
          this.isLoading = false;
          this.$notify(this.notifyData);
        }
      }
    },
    async findMediaElements(searchData) {
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
          this.resData = await this.findMedia(searchData);
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
        } catch (error) {
          this.$notify(this.notifyData);
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
          this.resData = await this.findMedia(searchData);
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
        } catch (error) {
          this.$notify(this.notifyData);
          this.isLoading = false;
        }
      }
    },
    async searchData(routeSearchData) {
      this.currentPage = 1;
      if (routeSearchData.searchQuery && !this.searchMedia.length) {
        try {
          this.isLoading = true;
          this.resData = await this.findMedia(routeSearchData);
          if (this.resData.data.results.length === 0) {
            this.$notify({
              group: "empty-search",
              classes: "search-notification",
            });
          }
          this.searchMedia = this.resData.data.results;
          this.totalPages = this.resData.data.total_pages;
          this.isLoading = false;
        } catch (error) {
          this.$notify(this.notifyData);
          this.isLoading = false;
        }
      }
    },
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