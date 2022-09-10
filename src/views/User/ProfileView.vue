<template>
  <section class="vh-100">
    <div class="profile container h-100">
      <div class="profile__container h-100 row d-flex px-2 justify-content-center">
        <div class="profile__content p-5 col-12 col-md-12 col-lg-9 col-xl-10">
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
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return{
      account: {
      },
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
  },
  async created() {
    try {
      const session_id = localStorage.getItem("sessionToken");
      const { data } = await this.getUserAccountDetails(session_id);
      this.account = { ...data };
      console.log(this.account);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    ...mapActions(["getUserAccountDetails"]),
  },
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/variables.scss";
  .profile{
    &__container{
      background-image: linear-gradient( 83.2deg,  rgba(70, 179, 125, 0.575) 10.8%, rgb(173, 65, 245) 94.3%);
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
