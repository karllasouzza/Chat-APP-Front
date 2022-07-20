<template>
  <menu>
    <NewMessageIcon :quant="quant" />
  </menu>
</template>

<script>
import NewMessageIcon from '~/assets/icons/NewMessageIcon.vue'
export default {
  components: { NewMessageIcon },
  props: {
    quant: {
      required: true,
      type: Number,
    },
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

    fill: $Primary20;

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
