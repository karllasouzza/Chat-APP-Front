<template>
  <svg
    width="192"
    height="192"
    viewBox="0 0 192 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_bd_513_58)">
      <path
        d="M108.59 89.2458C108.59 78.2001 99.636 69.2458 88.5903 69.2458H35.7379C24.6922 69.2458 15.7379 78.2002 15.7379 89.2458V160.098C15.7379 161.203 16.6333 162.098 17.7379 162.098H88.5904C99.636 162.098 108.59 153.144 108.59 142.098V89.2458Z"
        :fill="colors.Primary"
      />
    </g>
    <g filter="url(#filter1_bd_513_58)">
      <path
        d="M55.082 58.3279C55.082 41.7594 68.5135 28.3279 85.082 28.3279H144.689C161.257 28.3279 174.689 41.7593 174.689 58.3279V145.934C174.689 147.039 173.793 147.934 172.689 147.934H85.0821C68.5135 147.934 55.082 134.503 55.082 117.934V58.3279Z"
        fill="white"
        fill-opacity="0.56"
        shape-rendering="crispEdges"
      />
    </g>
    <path
      d="M148.122 88.1311C148.122 95.519 142.133 100.721 134.745 100.721C128.45 103.056 119.794 100.721 121.368 87.3442C121.368 79.9563 127.357 73.9672 134.745 73.9672C142.133 73.9672 148.122 80.7432 148.122 88.1311Z"
      fill="black"
    />
    <path
      d="M81.8362 88.1311C81.8362 95.519 87.8253 100.721 95.2133 100.721C101.508 103.056 110.164 100.721 108.59 87.3442C108.59 79.9563 102.601 73.9672 95.2133 73.9672C87.8253 73.9672 81.8362 80.7432 81.8362 88.1311Z"
      fill="black"
    />
    <defs>
      <filter
        id="filter0_bd_513_58"
        x="11.7378"
        y="65.2458"
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
          result="effect1_backgroundBlur_513_58"
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
          in2="effect1_backgroundBlur_513_58"
          result="effect2_dropShadow_513_58"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_513_58"
          result="shape"
        />
      </filter>
      <filter
        id="filter1_bd_513_58"
        x="44.082"
        y="17.3279"
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
          result="effect1_backgroundBlur_513_58"
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
          in2="effect1_backgroundBlur_513_58"
          result="effect2_dropShadow_513_58"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_513_58"
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
  data() {
    return {
      colors: { ...colors },
    }
  },
}
</script>

