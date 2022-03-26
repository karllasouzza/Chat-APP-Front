<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 52">
    <g filter="url(#a)">
      <title>{{ $t('Icons.close') }}</title>
      <path
        :fill="colors.Secondary"
        fill-rule="evenodd"
        d="M45.9986 5.96041c2.6139 2.61388 2.6139 6.85179 0 9.46569l-10.614 10.614 10.4313 10.4314c2.6139 2.6139 2.6139 6.8518 0 9.4657-2.6138 2.6139-6.8518 2.6139-9.4656 0L25.9189 35.5058 15.6088 45.8159c-2.6139 2.6139-6.85182 2.6139-9.4657 0-2.61388-2.6138-2.61388-6.8518 0-9.4657l10.3101-10.3101L5.96041 15.5474c-2.61388-2.6139-2.61388-6.85185 0-9.46573 2.61388-2.61388 6.85179-2.61388 9.46569 0L25.9189 16.5745l10.614-10.61409c2.6139-2.61388 6.8518-2.61388 9.4657 0Z"
        clip-rule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="a"
        width="51.959"
        height="51.8976"
        x="0"
        y="0"
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          values="0 0 0 0 0.917647 0 0 0 0 0.0235294 0 0 0 0 0.247059 0 0 0 0.51 0"
        />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_11_2" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_11_2"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
import colors from '~/static/Scss/color.scss'
export default {
  data() {
    return {
      colors: { ...colors },
    }
  },
}
</script>

<style lang="scss" scoped>
svg {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.7s ease-in-out;

  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);
  }
}
</style>
