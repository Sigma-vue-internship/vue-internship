<template>
  <div
    v-if="isLoading"
    class="text-center"
  >
    <div class="mt-4 spinner-border text-light">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpinnerLoader",
  props: {
    isLoading: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>