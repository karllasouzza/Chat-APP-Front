<template>
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <rect width="8" height="8" rx="4" :fill="colors.Secondary" />
  </svg>
</template>

<script>
import colors from '~/static/Scss/color.scss'

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors: { ...colors },
    }
  },
}
</script>

<style lang="scss" scoped></style>
