<template>
      <footer class="pt-5 px-5">
          <div class="container">
            <div class="row">
                <div class="col-6 col-md-2 mb-3">
                    <h5>Support</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Home</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Conditions of Use</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">For developers</a>
                        </li>
                    </ul>
                </div>
                <div class="col-6 col-md-2 mb-3">
                    <h5>Features</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Press Room</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">About us</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Pricing</a>
                        </li>
                    </ul>
                </div>
                <div class="col-6 col-md-2 mb-3">
                    <h5>Privacy</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Advertising</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Site Index</a>
                        </li>
                        <li class="nav-item mb-2">
                            <a href="#" class="nav-link p-0 text-muted">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-5 offset-md-1 mb-3">
                    <form>
                        <h5>Find movie or actor info</h5>
                            <SearchForm
                                :mode="'preview'"
                                @findMedia="findMedia"
                                class="searchForm"
                            />
                    </form>
                </div>
            </div>
            <div class="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                <p>© 2022 Sigma, Inc. All rights reserved.</p>
                <ul class="list-unstyled d-flex">
                    <li class="ms-3">
                        <a href="#" class="bi">
                            <img src="../assets/facebook.png" width="24" height="24"/>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a href="#" class="bi">
                            <img src="../assets/instagram.png" width="24" height="24"/>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a href="#" class="bi">
                            <img src="../assets/youtube.png" width="24" height="24"/>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a href="#" class="bi">
                            <img src="../assets/linkedin.png" width="24" height="24"/>
                        </a>
                    </li>
                </ul>
            </div>
          </div>
      </footer>
</template>

<script>
import SearchForm from "../components/SearchForm";
export default {
    name: "Footer",
    components: {
        SearchForm
    },
    methods: {
        async findMedia(searchData) {
            if (searchData) {
                this.$router
                    .push({
                    path: "/search",
                    query: {
                        searchQuery: searchData.searchQuery,
                    },
                    })
                    .catch(() => {});
                return;
            }
        },
    }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
    footer {
        min-width: 100%;
        background-color: $darkPurple;
    }
    h5 {
        color: white;
    }
    p {
        color: rgb(184, 184, 184);
    }
    .searchForm {
        background-color: transparent;
        padding: 0;
    }
</style>
