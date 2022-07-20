<template>
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M6.24365 9.3656L12.4874 15.6094L18.7311 9.3656"
      :stroke="Neutral0"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
import pallet from '~/assets/Scss/main.scss'



export default {
  props: { title: { type: String, required: true } },
  data() {
    return {
      Neutral0: pallet.Neutral0,
    }
  },
}
</script>
