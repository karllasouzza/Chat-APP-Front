<template>
  <div>
    <svg
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.86984 9.7897C4.81146 9.73188 4.56471 9.51588 4.35983 9.31298C3.07656 8.12936 0.978153 5.03885 0.335965 3.42214C0.233523 3.17669 0.0154213 2.55597 0 2.22325C0 1.9058 0.0738021 1.60253 0.219203 1.31344C0.422985 0.952352 0.74463 0.664356 1.12355 0.505085C1.38572 0.403631 2.17331 0.244361 2.18763 0.244361C3.04792 0.0861808 4.44685 0 5.99339 0C7.46503 0 8.80668 0.0861808 9.68129 0.215997C9.69671 0.230179 10.6738 0.38945 11.0086 0.562902C11.6211 0.880353 12 1.50107 12 2.16543V2.22325C11.9857 2.65633 11.6057 3.56614 11.5924 3.56614C10.9502 5.09667 8.95319 8.11408 7.62585 9.32716C7.62585 9.32716 7.28438 9.6697 7.07178 9.81806C6.76556 10.0493 6.38663 10.165 6.00771 10.165C5.58473 10.165 5.19148 10.0352 4.86984 9.7897"
        :fill="colors.Primary"
      />
      <text
        v-if="quant <= 9"
        :fill="colors.White"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Raleway"
        font-size="6"
        letter-spacing="0em"
      >
        <tspan x="4.50293" y="6.471">{{ quant }}</tspan>
      </text>
      <text
        v-else
        :fill="colors.White"
        xml:space="preserve"
        style="white-space: pre"
        font-family="Raleway"
        font-size="5"
        letter-spacing="0em"
      >
        <tspan x="4.50293" y="6.471">9+</tspan>
      </text>
    </svg>
  </div>
</template>

<script>
import colors from '~/static/Scss/color.scss'
export default {
  props: {
    quant: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      colors: { ...colors },
    }
  },
}
</script>

<style lang="scss" scoped>
div {
  width: 60px;
  height: 60px;

  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  bottom: 50px;
  left: 0px;

  cursor: pointer;

  animation: TopToBottom infinite 2s ease-in-out;
  transition: animation 0.7s ease-in-out;

  svg {
    width: 50%;
    height: 50%;

    fill: $PrimaryColor;

    cursor: pointer;
  }
}

@keyframes TopToBottom {
  from {
    bottom: 50px;
  }

  50% {
    bottom: 30px;
  }

  to {
    bottom: 50px;
  }
}
</style>
