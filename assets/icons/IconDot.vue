<template>
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>

    <path
      d="M0 4C0 1.79086 1.79086 0 4 0V0C6.20914 0 8 1.79086 8 4V4C8 6.20914 6.20914 8 4 8H1.6C0.716344 8 0 7.28366 0 6.4V4Z"
      :fill="Secondary20"
    />
  </svg>
</template>

<script>
import pallet from '~/assets/Scss/main.scss'



export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Secondary20: pallet.Secondary20,
    }
  },
}
</script>

<style lang="scss" scoped></style>
