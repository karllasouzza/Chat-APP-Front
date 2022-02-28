<template>
  <main
    v-chat-scroll="{
      always: false,
      smooth: true,
      notSmoothOnInit: true,
      scrollonremoved: true,
    }"
    class="main"
    @v-chat-scroll-top-reached="infiniteHandler()"
  >
    <ChatCard
      v-for="(item, index) in messages"
      :key="index"
      :text="item.CONTENT"
      :user-i-d="item.ID_USERS"
      :before="
        index != 0
          ? messages[index - 1].ID_USERS === item.ID_USERS
            ? true
            : false
          : false
      "
      :last="
        messages[messages.length - 1].ID_USERS === item.ID_USERS
          ? (showLoader = true)
          : ''
      "
    />
    <NewMessage
      v-if="newMessage"
      :quant="quantNewMessage"
      @click.native="ScrollToBottom()"
    />
    <div v-observe-visibility="visibilityChanged" class="bottom" />
  </main>
</template>

<script>
import { io } from 'socket.io-client'

import { mapState } from 'vuex'

import ModelMessage from '~/static/Models/ModelMessage'

export default {
  name: 'HomePage',
  layout: 'ChatLayout',
  data() {
    return {
      messages: [],

      // InfiniteScroll
      currentPage: 1,
      maxPerPage: parseInt(screen.height / 70),
      totalResults: 100,

      // New Message
      onBottom: false,
      newMessage: false,
      quantNewMessage: 0,
    }
  },

  async fetch() {
    await this.$axios
      .$get(`/dev/messages/scroll/${this.maxPerPage},${this.currentPage}`)
      .then((response) => {
        this.messages.unshift(...response.data.response.reverse())
      })
  },
  fetchOnServer: false,
  fetchDelay: 200,

  computed: {
    ...mapState({
      user: (state) => state.User.user,
    }),
    sumMaxPerPage() {
      return screen.height / 70
    },
  },

  mounted() {
    const socket = io('http://localhost:4000')

    socket.on('message-created', (serverTask) => {
      this.messages.push(ModelMessage(serverTask.response))
      if (!this.onBottom) {
        this.newMessage = true
        this.quantNewMessage++
      }
    })
  },
  methods: {
    infiniteHandler() {
      this.$axios
        .get(
          `/dev/messages/scroll/${this.maxPerPage},${this.currentPage + 1}`,
          {
            progress: false,
          }
        )
        .then((response) => {
          const data = response.data.data.response
          if (data.length) {
            this.currentPage += 1
            this.messages.unshift(...data.reverse())
          } else;
        })
    },
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible
      this.onBottom = entry.isIntersecting
    },
    ScrollToBottom() {
      document.querySelector('.bottom').scrollIntoView()
      this.newMessage = false
      this.quantNewMessage = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .wave-item {
    background-color: $PrimaryColor;
  }
}
</style>
