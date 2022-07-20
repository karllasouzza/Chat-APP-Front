<template>
  <p :class="isLabel === 'true' ? 'label' : 'title'">
    <strong>{{ text }}</strong>
  </p>
</template>

<script>
export default {
  name: 'TitleProfile',
  props: {
    isLabel: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
p.title > strong {
  @include bold-text($Primary20);
  text-transform: none;
  font-size: 28px;
}

p.label {
  margin-bottom: 8px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  strong {
    @include bold-text($Primary20);
    font-size: 20px;
    text-transform: none;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
