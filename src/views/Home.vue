<template>
 <div>
    <ToDo msg="I want to do..."/>
 </div>
</template>

<script>
import ToDo from "../components/ToDo.vue";
  export default {
    name: "Home",
    components: { ToDo }
  }
</script>

<style scoped lang="scss">
</style>
