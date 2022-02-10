<template>
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M7.99676 13.1746C3.68376 13.1746 -0.000244141 13.8546 -0.000244141 16.5746C-0.000244141 19.2956 3.66076 19.9996 7.99676 19.9996C12.3098 19.9996 15.9938 19.3206 15.9938 16.5996C15.9938 13.8786 12.3338 13.1746 7.99676 13.1746"
      :fill="colors.Primary"
    />
    <path
      opacity="0.4"
      d="M7.99671 10.5837C10.9347 10.5837 13.2887 8.2287 13.2887 5.2917C13.2887 2.3547 10.9347 -0.000297546 7.99671 -0.000297546C5.05971 -0.000297546 2.70471 2.3547 2.70471 5.2917C2.70471 8.2287 5.05971 10.5837 7.99671 10.5837"
      :fill="colors.Primary"
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
