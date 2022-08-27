<template>
  <div>
    <SearchForm :mode="'optional'" @findMedia="findMedia" class="mt-5" />
    <SpinnerLoader v-if="isLoading" :isLoading="isLoading" />
    <ul v-if="searchMedia.length">
      <li v-for="media in searchMedia" :key="media.media_type + ' ' + media.id">
        <SingleMovieSearch v-if="media.media_type === 'movie'" :movie="media" />
        <SingleCelebritySearch
          v-else-if="media.media_type === 'person'"
          :celebrity="media"
        />
      </li>
    </ul>
    <div v-show="searchMedia.length && !isLoading" ref="observer"></div>
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
    async loadMoreMedia(routeSearchData) {
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

        this.searchMedia = this.resData.data.results;
        this.totalPages = this.resData.data.total_pages;
        this.isLoading = false;
      } catch (e) {
        console.log(e);
        this.isLoading = false;
      }
    }
  },
  mounted() {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        this.loadMoreMedia({ ...this.$route.query });
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>
<style lang="scss">
ul {
  padding: 0;
}
</style>