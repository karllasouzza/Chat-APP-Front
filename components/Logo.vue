<template>
  <svg
    width="165"
    height="165"
    viewBox="0 0 165 165"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ $t('Title_Icon') }}</title>
    <g filter="url(#filter0_d_416_141)">
      <path
        d="M110 13.75H55C32.2506 13.75 13.75 32.2506 13.75 55V144.375C13.75 146.198 14.4743 147.947 15.7636 149.236C17.053 150.526 18.8016 151.25 20.625 151.25H110C132.749 151.25 151.25 132.749 151.25 110V55C151.25 32.2506 132.749 13.75 110 13.75ZM75.625 85.9375C75.625 88.6725 74.5385 91.2956 72.6045 93.2295C70.6706 95.1635 68.0475 96.25 65.3125 96.25C64.7212 96.25 64.1575 96.1744 63.5938 96.0781C63.0231 96.1469 62.4663 96.25 61.875 96.25C59.1555 96.25 56.4971 95.4436 54.2359 93.9327C51.9747 92.4218 50.2124 90.2744 49.1717 87.7619C48.131 85.2494 47.8587 82.4847 48.3892 79.8175C48.9197 77.1503 50.2293 74.7003 52.1523 72.7773C54.0753 70.8543 56.5253 69.5447 59.1925 69.0142C61.8597 68.4837 64.6244 68.756 67.1369 69.7967C69.6494 70.8374 71.7968 72.5997 73.3077 74.8609C74.8186 77.1221 75.625 79.7805 75.625 82.5C75.625 83.0844 75.5219 83.6481 75.4531 84.2188C75.5425 84.7825 75.625 85.3462 75.625 85.9375ZM103.125 96.25C102.534 96.25 101.977 96.1469 101.406 96.0781C100.839 96.1843 100.264 96.2418 99.6875 96.25C96.9525 96.25 94.3294 95.1635 92.3955 93.2295C90.4615 91.2956 89.375 88.6725 89.375 85.9375C89.375 85.3531 89.4575 84.7825 89.5469 84.2188C89.4781 83.6481 89.375 83.0913 89.375 82.5C89.375 79.7805 90.1814 77.1221 91.6923 74.8609C93.2032 72.5997 95.3506 70.8374 97.8631 69.7967C100.376 68.756 103.14 68.4837 105.807 69.0142C108.475 69.5447 110.925 70.8543 112.848 72.7773C114.771 74.7003 116.08 77.1503 116.611 79.8175C117.141 82.4847 116.869 85.2494 115.828 87.7619C114.788 90.2744 113.025 92.4218 110.764 93.9327C108.503 95.4436 105.844 96.25 103.125 96.25V96.25Z"
        fill="white"
        class="Logo_animate"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_416_141"
        x="9.75"
        y="13.75"
        width="145.5"
        height="145.5"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
          in2="BackgroundImageFix"
          result="effect1_dropShadow_416_141"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_416_141"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: 'LogoImage',
}
</script>

<style scoped>
.Logo_animate {
  stroke-width: 1px;
  animation: Change_color 3s infinite;
}

@keyframes Change_color {
  from {
    stroke: #f94144;
  }
  20% {
    stroke: #f3722c;
  }
  30% {
    stroke: #f8961e;
  }
  40% {
    stroke: #f9844a;
  }
  50% {
    stroke: #f9c74f;
  }
  60% {
    stroke: #90be6d;
  }
  70% {
    stroke: #43aa8b;
  }
  80% {
    stroke: #277da1;
  }
  90% {
    stroke: #273da1;
  }
  to {
    stroke: #6a4c93;
  }
}
</style>
