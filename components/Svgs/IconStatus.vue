<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_606_2)">
      <path
        d="M15.9902 0.956568C7.68744 0.956568 0.95669 7.68732 0.95669 15.9901C0.95669 31.0237 0.95669 31.0237 15.9902 31.0237C24.2931 31.0237 31.0238 24.2929 31.0238 15.9901C31.0238 7.68732 24.2931 0.956568 15.9902 0.956568Z"
        :stroke="colors.Primary"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="10 5"
      />
      <path
        opacity="0.8"
        d="M4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C4 28 4 28 4 16Z"
        :fill="colors.Secondary"
      />
    </g>
    <defs>
      <clipPath id="clip0_606_2">
        <rect
          width="32"
          height="32"
          :fill="colors.White"
          transform="translate(32 32) rotate(-180)"
        />
      </clipPath>
    </defs>
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
