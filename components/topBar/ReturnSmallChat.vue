<template>
  <header class="navTopChats">
    <nuxt-link :to="to">
      <LeftArrow />
    </nuxt-link>
    <span>
      <Strong> {{ label }}</Strong>
    </span>
    <img :src="src" alt="" />
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
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
header.navTopChats {
  width: 100%;
  height: 62px;

  background: $Neural99;
  border-bottom: $Neural10 1px solid;

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
    justify-content: center;

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

  img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    @include Elevation_1;
  }
}
</style>
