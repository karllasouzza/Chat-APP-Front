<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <ellipse
      cx="8.59922"
      cy="8.65324"
      rx="8.59922"
      ry="8.65324"
      :fill="Primary20"
    />
    <path
      opacity="0.4"
      d="M18.6745 19.9553C18.3405 19.9444 18.0228 19.807 17.7853 19.5705L15.7488 17.1901C15.3122 16.7909 15.2765 16.1123 15.6688 15.6689C15.8524 15.4831 16.102 15.3786 16.3624 15.3786C16.6228 15.3786 16.8725 15.4831 17.0561 15.6689L19.6172 17.7181C19.9861 18.0957 20.0999 18.6562 19.9078 19.1492C19.7157 19.6422 19.2535 19.9754 18.7279 20L18.6745 19.9553Z"
      :fill="Primary20"
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
      Primary20: pallet.Primary20,
    }
  },
}
</script>

<style></style>
