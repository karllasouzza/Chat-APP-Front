<template>
  <svg
    width="175"
    height="154"
    viewBox="0 0 175 154"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>
    <g filter="url(#filter0_bd_501_3)">
      <path
        d="M97.5903 72.2458C97.5903 61.2001 88.636 52.2458 77.5903 52.2458H24.7379C13.6922 52.2458 4.73787 61.2002 4.73787 72.2458V140.098C4.73787 142.86 6.97645 145.098 9.73787 145.098H77.5904C88.636 145.098 97.5903 136.144 97.5903 125.098V72.2458Z"
        :fill="colors.Primary"
      />
    </g>
    <g filter="url(#filter1_bd_501_3)">
      <path
        d="M44.082 41.3279C44.082 24.7594 57.5135 11.3279 74.082 11.3279H133.689C150.257 11.3279 163.689 24.7593 163.689 41.3279V120.934C163.689 126.457 159.211 130.934 153.689 130.934H74.0821C57.5135 130.934 44.082 117.503 44.082 100.934V41.3279Z"
        :fill="colors.White"
        fill-opacity="0.56"
        shape-rendering="crispEdges"
      />
    </g>
    <path
      d="M137.122 71.1311C137.122 78.519 131.133 83.7213 123.745 83.7213C117.45 86.0562 108.794 83.7213 110.368 70.3442C110.368 62.9563 116.357 56.9672 123.745 56.9672C131.133 56.9672 137.122 63.7432 137.122 71.1311Z"
      :fill="colors.Black"
    />
    <path
      d="M70.8362 71.1311C70.8362 78.519 76.8253 83.7213 84.2133 83.7213C90.5083 86.0562 99.1641 83.7213 97.5903 70.3442C97.5903 62.9563 91.6012 56.9672 84.2133 56.9672C76.8253 56.9672 70.8362 63.7432 70.8362 71.1311Z"
      :fill="colors.Black"
    />
    <defs>
      <filter
        id="filter0_bd_501_3"
        x="0.737793"
        y="48.2458"
        width="100.853"
        height="104.852"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_501_3"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_501_3"
          result="effect2_dropShadow_501_3"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_501_3"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_bd_501_3"
        x="33.082"
        y="0.327881"
        width="141.606"
        height="141.607"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_501_3"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="5.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_backgroundBlur_501_3"
          result="effect2_dropShadow_501_3"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_501_3"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
import colors from '~/static/Scss/color.scss'
export default {
  name: 'LogoImage',
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      colors: { ...colors },
    }
  },
}
</script>
