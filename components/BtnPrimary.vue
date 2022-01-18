<template>
  <button :type="type">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true,
    },
    type: {
      type: String,
      default: 'text',
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  display: inline-block;

  font-size: 1.2em;
  background-color: $PrimaryColor;

  border-radius: 10px;
}
</style>
