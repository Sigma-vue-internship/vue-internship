<template>
  <section>
    <div
      class="profile container h-100"
    >
      <div
        class="profile__container h-100 row d-flex px-2 justify-content-center"
      >
        <SpinnerLoader
          v-if="isLoading"
          :is-loading="isLoading"
        />
        <div
          v-else
          class="profile__content p-5 col-12 col-md-12 col-lg-12 col-xl-112"
        >
          <div class="row d-flex">
            <div class="profile__img-container col-md-4 col-lg-4 col-xl-3">
              <img
                class="profile__img img-fluid"
                :src="avatarPath"
                alt="Your avatar"
              >
            </div>
            <div class="profile__username-container col-md-4 col-lg-2 mx-md-4 mx-xxl-0">
              <div class="profile__username-info d-flex align-items-center">
                <p class="profile__username mx-1  ">
                  {{ account.username }}
                </p>
                <p class="profile__region">
                  ({{ account.iso_3166_1 }})
                </p>
              </div>
            </div>
          </div>
          <div
            class="pt-3 mt-4 tabElement"
          >
            <b-tabs content-class="">
              <b-tab
                title="My Watchlist"
                active
              >
                <div class="row my-0 gx-2">
                  <Watchlist :watchlist="watchlist" />
                </div>
              </b-tab>
              <b-tab
                title="My favorites"
              />
              <div class="row my-0 gx-2" />
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Watchlist from '../../components/profile/Watchlist.vue';
import SpinnerLoader from '../../components/common/SpinnerLoader.vue';
export default {
  components: { Watchlist, SpinnerLoader },
  data() {
    return {
      account: {},
      watchlist: [],
      isLoading:false,
    };
  },
  computed: {
    avatarPath() {
      const avatar = this.account.avatar;
      if (avatar && !avatar.tmdb.avatar_path) {
        return `https://secure.gravatar.com/avatar/${avatar.gravatar.hash}.jpg?s=200`;
      }
      return avatar && `https://image.tmdb.org/t/p/w200${avatar.tmdb.avatar_path}`;
    },
    ...mapGetters(["getSessionToken"]),
  },
  async created() {
    try {
      this.isLoading = true;
      const session_id = this.getSessionToken;
      const { data } = await this.getUserAccountDetails(session_id);
      const accountInfo = {
        session_id,
        account_id: data.id,
        list_type: "watchlist",
      };
      const watchlistRes = await this.getUserList(accountInfo);
      this.account = { ...data };
      this.watchlist = watchlistRes.data.results;
      this.isLoading = false;
    }
    catch (error) {
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
    ...mapActions(["getUserAccountDetails", "getUserList"]),
  },
};
</script>
<style lang="scss">
  @import "../../assets/scss/variables.scss";
  .profile{
    .tabElement {
  .nav-tabs {
    border-bottom: 1px solid $lightGreen;
    .nav-link {
    border: 1px solid $lightGreen;
    color: $lightGreen;
    }
    .nav-link.active {
      background-color: $lightGreen;
      border: 1px solid $lightGreen;
      color: rgb(27, 13, 45);
    }
  }
}
    &__content{
      background-color: rgba(0, 0, 0, 0.192);
      box-shadow: 0px -10px 29px 7px rgba(0, 0, 0, 0.616);
    }
    &__username{
      font-size:1.5rem;
      color: white;
    }
    &__img{
      border: 2px solid $lightGreen;
    }
    &__region{
      font-size:1.25rem;
      color: rgba(255, 255, 255, 0.452);
    }
    @media(max-width:768px){
      &__content{
        text-align: center;
      }
      &__username-info{
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
</style>
