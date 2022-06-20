<template>
  <header class="greet">
    <nuxt-link :to="to">
      <LeftArrow />
    </nuxt-link>
    <span>
      <Strong> {{ label }}</Strong>
    </span>
  </header>
</template>

<script>
import LeftArrow from '~/assets/icons/LeftArrow.vue'

export default {
  components: { LeftArrow },
  props: {
    label: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
header.greet {
  width: 100%;
  height: 61px;

  background: $Neural99;

  grid-row: 2/3;
  grid-column: 1/4;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    width: 70%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    strong {
      height: auto;
      @include title_medium;
      font-weight: bold;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  svg {
    cursor: pointer;
  }
}
</style>
