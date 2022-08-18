<template>
  <div>
    <ClickCounter />
    <HoverCounter />
  </div>
</template>

<script>
import ClickCounter from "@/components/ClickCounter";
import HoverCounter from "@/components/HoverCounter";
export default {
  name: "StartRocket",
  components: {HoverCounter, ClickCounter}
}
</script>

<style scoped>

</style>
