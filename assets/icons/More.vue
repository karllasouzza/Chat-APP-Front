<template>
  <svg
    width="40"
    height="40"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <path
      d="M6.36732 3.2363H4.63932V1.5093C4.63932 1.0983 4.30632 0.764297 3.89532 0.764297C3.48432 0.764297 3.15032 1.0983 3.15032 1.5093V3.2363H1.42332C1.01232 3.2363 0.679321 3.5703 0.679321 3.9813C0.679321 4.3923 1.01232 4.7263 1.42332 4.7263H3.15032V6.4523C3.15032 6.8633 3.48432 7.1973 3.89532 7.1973C4.30632 7.1973 4.63932 6.8633 4.63932 6.4523V4.7263H6.36732C6.77832 4.7263 7.11232 4.3923 7.11232 3.9813C7.11232 3.5703 6.77832 3.2363 6.36732 3.2363Z"
      :fill="Neutral100"
    />
  </svg>
</template>

<script>
import pallet from '~/assets/Scss/main.scss'



export default {
  name: `MoreItens`,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Neutral100: pallet.Neutral100,
    }
  },
}
</script>

<style></style>
