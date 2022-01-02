<template>
  <header>
    <textarea-autosize
      ref="message"
      v-model="content"
      placeholder="Escreva uma mensagem"
    />
    <div @click="sendMessages()"><SendMessage /></div>
  </header>
</template>

<script>
import SendMessage from './Svgs/SendMessage.vue'
export default {
  components: { SendMessage },
  data() {
    return {
      content: '',
    }
  },
  methods: {
    sendMessages() {
      if (!this.content) {
        this.$refs.message.focus()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 2px solid #360c8a;

  textarea {
    resize: none;

    height: auto;
    overflow: hidden;

    flex-grow: 4;

    border: none;
    border-radius: 0 0 0 15px;
    padding: 2px 4px;

    vertical-align: middle;
    text-align: start;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }
  }

  div {
    max-width: 45px;
    height: 100%;

    background: #d7ccff;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;

    border-radius: 0 0 15px 0;
    cursor: pointer;
  }
}
</style>
