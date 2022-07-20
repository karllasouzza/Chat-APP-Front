<template>
  <svg
    width="24"
    height="34"
    viewBox="0 0 24 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>

    <path
      d="M10.4605 24.4558C4.81773 24.4558 0 25.358 0 28.9623C0 33.5 0 33.5 10.4605 33.5C16.1019 33.5 20.9211 32.5978 20.9211 28.9934C20.9211 25.3891 16.1326 24.4558 10.4605 24.4558Z"
      :fill="Primary20"
    />
    <path
      opacity="0.4"
      d="M10.4605 21.023C14.3024 21.023 17.3821 17.9036 17.3821 14.0122C17.3821 10.1208 14.3024 7 10.4605 7C6.6186 7 3.53894 10.1208 3.53894 14.0122C3.53894 21.023 3.53894 21.023 10.4605 21.023Z"
      :fill="Primary20"
    />
    <path
      d="M20.7526 6.21966H17.7449V3.27904C17.7449 2.02362 16.738 1 15.4974 1C14.2594 1 13.25 2.02362 13.25 3.27904V6.21966H10.2474C9.00685 6.21966 8 7.24327 8 8.4987C8 9.75412 9.00685 10.7777 10.2474 10.7777H13.25V13.721C13.25 14.9764 14.2594 16 15.4974 16C16.738 16 17.7449 14.9764 17.7449 13.721V10.7777H20.7526C21.9906 10.7777 23 9.75412 23 8.4987C23 7.24327 21.9906 6.21966 20.7526 6.21966Z"
      :fill="Secondary20"
      :stroke="Neutral100"
    />
  </svg>
</template>

<script>
import pallet from '~/assets/Scss/main.scss'


export default {
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      Primary20: pallet.Primary20,
      Neutral100: pallet.Neutral100,
    }
  },
}
</script>

<style></style>
