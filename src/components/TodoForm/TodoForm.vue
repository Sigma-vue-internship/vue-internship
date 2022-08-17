<template>
  <form @submit.prevent="emitAddItem()">
    <input
      type="text"
      v-on:input="$emit('input', $event.target.value)"
      ref="itemLabel"
    />
    <textarea name="" id="" cols="30" rows="10"></textarea>
    <button class="addTaskBtn" type="submit" @keydown.enter="emitAddItem()">
      Add task
    </button>
  </form>
</template>

<script>
export default {
  methods: {
    emitAddItem() {
      this.$emit("addItem");
      this.$refs["itemLabel"].value = "";
    },
  },
};
</script>

<style>
</style>