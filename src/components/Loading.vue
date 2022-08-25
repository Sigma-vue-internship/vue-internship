<template>
      <div v-if="isLoading" class="text-center">
      <div class="spinner-border text-primary">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            default:()=>(false),
        }
    }
}
</script>

<style>

</style>