<template>
  <header>
    <textarea-autosize
      ref="message"
      v-model="content"
      placeholder="Escreva uma mensagem"
      @keyup.enter.native="action"
    />
    <div @click="sendMessages()">
      <SendMessage />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import SendMessage from './Svgs/SendMessage.vue'

export default {
  components: { SendMessage },
  data() {
    return {
      content: '',
    }
  },
  computed: {
    ...mapState({
      userX: (state) => state.User.user[0],
    }),
  },
  methods: {
    action(event) {
      if (!event.shiftKey) {
        this.sendMessages()
      } else;
    },
    sendMessages() {
      if (this.content) {
        this.$axios
          .post('/dev/messages', {
            content: this.content,
            id: this.userX.ID,
          })
          .then(() => {
            this.content = ''
          })
      } else {
        // this.$refs.message.focus()
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

  border-top: 2px solid  $PrimaryColor;
  background: $Third;

  textarea {
    resize: none;

    height: auto;
    overflow: hidden;

    flex-grow: 4;

    border: none;
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

    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 2;

    cursor: pointer;
  }
}
</style>
