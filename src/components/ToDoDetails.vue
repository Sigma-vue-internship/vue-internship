<template>
  <div class="todoDetails" >
    <button class="description">
      {{ element.description }}
    </button>
  </div>
</template>

<script>
  export default {
    name: "ToDoDetails",
    props: ["element"]
  }
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";
 .description {
    @include infoElement;
    margin-left: 10px;
 }
</style>
