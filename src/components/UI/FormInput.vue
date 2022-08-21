<template>
  <input
    class="form__input"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    value: [String, Number],
  },
  name: "form-input",
};
</script>

<style lang="scss" scoped>
.form__input {
  all: unset;
  font-family: cursive;
  border: 2px solid #15d798;
  text-align: left;
  padding: 5px;
  border-radius: 10px;
  width: 50%;
  &:focus {
    border: 2px dashed #15d798;
  }
}
</style>