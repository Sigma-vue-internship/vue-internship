<template>
  <div class="celebrities">
    <div class="scroll" @scroll="changeCelebritiesPage">
      <ul class="celebritiesList" v-if="celebritiesList.length">
        <SingleCelebrityElementList
          :celebrity="celebrity"
          v-for="(celebrity) in celebritiesList"
          :key="celebrity.id"
          @click.native="routeToCelebrityPage(celebrity.id)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import SingleCelebrityElementList from './SingleCelebrityElementList.vue';
export default {
  name: "CelebritiesList",
  data() {
    return {
      celebritiesList: [],
      page: 1
    }
  },
  components: {
    SingleCelebrityElementList
  },
  methods: {
    routeToCelebrityPage(id) {
      this.$router.push({ path: `/celebrity/${id}` });
    },
    async changeCelebritiesPage(e) {
      try {
        const { scrollLeft, offsetWidth, scrollWidth } = e.target;
        if ((scrollLeft + offsetWidth) >= scrollWidth) {
          this.page++;
          const response = await this.$store.dispatch("changeCelebritiesPage", this.page);
          const { data } = response;
          this.celebritiesList = this.celebritiesList.concat(data.results);
        }
      } catch(error) {
        console.log(error);
      }
    }
  },
  async created() {
    try {
      const response = await this.$store.dispatch("getCelebrities");
      const { data } = response;
      this.celebritiesList = data.results;
    } catch(error) {
      console.log(error);
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";
  .celebrities {
    @include flex-center(row);
  }
  .scroll {
    height: 500px;
    width: 1100px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .scroll::-webkit-scrollbar {
    height: 30px;
  }
  .scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px $lightPurple; 
    border-radius: 20px;
  }
  .scroll::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: $darkPurple;
    -webkit-box-shadow: inset 0 0 6px $lightPurple; 
  }
  .celebritiesList {
    display: flex;
    flex-direction: row;
    padding-left: 0;
  }
</style>
