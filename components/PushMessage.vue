<template>
  <footer class="pushMessage">
    <textarea-autosize
      ref="message"
      v-model="content"
      :min-height="30"
      :max-height="250"
      spellcheck="true"
      placeholder="Escreva uma mensagem"
      @keyup.enter.native="action"
    />
    <div @click="sendMessages()">
      <SendMessage />
    </div>
  </footer>
</template>

<script>
import SendMessage from './Svgs/SendMessage.vue'

export default {
  components: { SendMessage },
  props: {
    chat: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: '',
      user: this.$supabase.auth.user(),
    }
  },
  methods: {
    action(event) {
      if (!event.shiftKey) {
        this.sendMessages()
      } else;
    },
    async sendMessages() {
      if (this.content && this.user.id) {
        await this.$supabase.from('messages').insert([
          {
            content: this.content,
            status: 'Send',
            user_from: this.user.id,
            chat_id: this.chat,
          },
        ])

        this.content = ''
      } else {
        // this.$refs.message.focus()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
footer.pushMessage {
  width: 96%;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: $Third;
  border-radius: 30pt;
  margin: auto;
  margin-top: 5px;
  padding:  10px 10px;

  textarea {
    resize: none;

    height: auto;
    overflow: hidden;

    flex-grow: 3;

    border: none;

    background: transparent;
    color: $white;

    text-align: start;

    font-family: 'Ubuntu', sans-serif;

    &:focus {
      outline: none;
    }

    &::placeholder {
      /* Firefox, Chrome, Opera */
      color: $white;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $white;
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: $white;
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
