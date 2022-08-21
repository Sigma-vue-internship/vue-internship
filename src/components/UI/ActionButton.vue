<template>
  <button class="btn" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "action-btn",
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 11px;
  border: 0px;
  transform: scale(1);
  padding: 10px 25px;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font: normal bold 15px "Open Sans", sans-serif;
  text-align: center;
  transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 500ms;
  &:hover {
    transform: scale(1.2);
  }
}
</style>