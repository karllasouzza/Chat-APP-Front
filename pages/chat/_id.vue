<template>
  <main
    v-chat-scroll="{
      always: false,
      smooth: true,
      notSmoothOnInit: true,
      scrollonremoved: true,
    }"
    class="main"
  >
    <!-- @v-chat-scroll-top-reached="infiniteHandler()" -->
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
import { mapState } from 'vuex'

// import ModelMessage from '~/static/Models/ModelMessage'

export default {
  name: 'ChatPage',
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

  computed: {
    ...mapState({
      user: (state) => state.User.user,
    }),
    sumMaxPerPage() {
      return screen.height / 70
    },
  },
  async created() {
    await this.fetchMessages()
    this.subscribeMessages()
  },
  destroyed() {
    this.unsubscribeMessages()
  },
  methods: {
    // infiniteHandler() {
    //   this.$axios
    //     .get(
    //       `/dev/messages/scroll/${this.$route.params.id},${this.maxPerPage},${
    //         this.currentPage + 1
    //       }`,
    //       {
    //         progress: false,
    //       }
    //     )
    //     .then((response) => {
    //       const data = response.data.data.response
    //       if (data.length) {
    //         this.currentPage += 1
    //         this.messages.unshift(...data.reverse())
    //       } else;
    //     })
    // },

    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible
      this.onBottom = entry.isIntersecting
    },
    ScrollToBottom() {
      document.querySelector('.bottom').scrollIntoView()
      this.newMessage = false
      this.quantNewMessage = 0
    },

    async fetchMessages() {
      const { data: messages } = await this.$supabase
        .from('messages')
        .select('*')
        .eq('chat_id', this.$route.params.id)
      this.messages = messages
      // this.loaded = true
    },

    subscribeMessages() {
      this.subscriptionChats = this.$supabase
        .from('pub_messages')
        .on('INSERT', (messages) => {
          if (messages.new) {
            return this.messages.push(messages.new)
          }
        })
        .on('DELETE', (messages) => {
          const index = this.messages.indexOf(messages)
          this.messages.splice(index, 1)
        })
        .subscribe()
    },

    unsubscribeMessages() {
      this.$supabase.removeSubscription(this.subscribeMessages)
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
