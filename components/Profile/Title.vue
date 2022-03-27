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
  @include bold-text($PrimaryColor);
  text-transform: none;
  font-size: 24px;
}

p.label {
  margin-bottom: 8px;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  strong {
    @include bold-text($PrimaryColor);
    text-transform: none;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
}
</style>
