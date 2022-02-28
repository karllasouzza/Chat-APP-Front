<template>
  <svg
    width="23"
    height="28"
    viewBox="0 0 23 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>

    <path
      d="M11.1959 18.4448C5.15765 18.4448 0 19.3968 0 23.2049C0 27.9999 0 27.5 11.1959 27.9999C17.2342 27.9999 22.3918 27.0493 22.3918 23.2399C22.3918 19.4304 17.2678 18.4448 11.1959 18.4448Z"
      :fill="colors.Primary"
    />
    <path
      opacity="0.8"
      d="M11.1959 14.8177C15.3092 14.8177 18.6048 11.5207 18.6048 7.40887C18.6048 3.29703 15.3092 0 11.1959 0C7.08408 0 3.78705 3.29703 3.78705 7.40887C3.78705 14.8177 3.78705 14.8177 11.1959 14.8177Z"
      :fill="colors.Secondary"
    />
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

<style></style>
