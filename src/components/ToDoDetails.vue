<template>
  <div class="todoDetails" >
    <button class="description">
      {{ item.description }}
    </button>
  </div>
</template>

<script>
  export default {
    name: "ToDoDetails",
    props: ["item"]
  }
</script>

<style scoped lang="scss">
@import "./../styles/variables.scss";
 .description {
    @include infoElement;
    margin-left: 10px;
 }
</style>
