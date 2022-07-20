<template>
  <svg
    width="34"
    height="25"
    viewBox="0 0 34 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ title }}</title>

    <g opacity="0.76">
      <path
        d="M12.1523 24.3333C11.3144 24.3333 10.4764 24.015 9.83671 23.3745L0.959542 14.4861C-0.319847 13.2051 -0.319847 11.1301 0.959542 9.85282C2.23893 8.57182 4.30765 8.56807 5.58704 9.84907L12.1523 16.4226L27.5948 0.960748C28.8742 -0.320249 30.9429 -0.320249 32.2223 0.960748C33.5017 2.24175 33.5017 4.31681 32.2223 5.59781L14.4679 23.3745C13.8283 24.015 12.9903 24.3333 12.1523 24.3333"
        :fill="Neutral100"
      />
    </g>
  </svg>
</template>

<script>
import pallet from '~/assets/Scss/main.scss'



export default {
  props: { title: { type: String, required: true } },
  data() {
    return {
      Neutral100: pallet.Neutral100,
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
