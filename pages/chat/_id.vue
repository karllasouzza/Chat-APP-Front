<template>
  <section class="container">
    <header>
      <nuxt-link to="/homePage">Esk</nuxt-link>
      <img :src="src" alt="" />
      <h1>{{ userTo.name }}</h1>
    </header>

    <main
      v-chat-scroll="{
        always: false,
        smooth: true,
        notSmoothOnInit: true,
        scrollonremoved: true,
      }"
      class="main"
    >
      <ChatCard
        v-for="(item, index) in messages"
        :key="index"
        v-observe-visibility="
          user.id !== item.user_from
            ? updateStatusMessage(item._id, 'View')
            : ''
        "
        :text="item.content"
        :user-i-d="item.user_from"
        :before="
          index != 0
            ? messages[index - 1].user_from === item.user_from
              ? true
              : false
            : false
        "
        :last="
          messages[messages.length - 1].user_from === item.user_from
            ? (showLoader = true)
            : ''
        "
        :user-to="userTo"
        :src="src"
        :status="item.status"
      />
      <NewMessage
        v-if="newMessage"
        :quant="quantNewMessage"
        @click.native="ScrollToBottom()"
      />
      <div v-observe-visibility="" class="bottom" />
    </main>
    <!-- @v-chat-scroll-top-reached="infiniteHandler()" -->

    <PushMessage :chat="$route.params.id" />
  </section>
</template>

<script>
import PushMessage from '~/components/PushMessage.vue'
// import ModelMessage from '~/static/Models/ModelMessage'

export default {
  name: 'ChatPage',
  components: { PushMessage },
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
      user: this.$supabase.auth.user(),
      userTo: {},
      src: {},
      subscriptionMessages: undefined,
    }
  },
  computed: {
    sumMaxPerPage() {
      return screen.height / 70
    },
  },
  async created() {
    await this.fetchMessages()
    this.subscribeMessages()
    await this.getChat()
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
        .order('created_at', { ascending: true })

      this.messages = messages
      // this.loaded = true
    },

    subscribeMessages() {
      this.subscriptionMessages = this.$supabase
        .from(`messages:chat_id=eq.${this.$route.params.id}`)
        .on('INSERT', (message) => {
          if (message.new.user_from !== this.user.id) {
            const update = this.updateStatusMessage(
              message.new._id,
              'Delivered'
            )
            if (update) {
              return this.messages.push(message.new)
            }
          } else return this.messages.push(message.new)
        })
        .on('UPDATE', (message) => {
          const index = this.messages.indexOf(message.new)
          this.messages.splice(index, 1)
        })
        .on('DELETE', (message) => {
          const index = this.messages.indexOf(message.new)
          this.messages.splice(index, 1)
        })
        .subscribe()
    },

    unsubscribeMessages() {
      this.$supabase.removeSubscription(this.subscribeMessages)
    },

    async getChat() {
      try {
        const { data: res, error } = await this.$supabase
          .from('chats')
          .select('*')
          .eq('_id', this.$route.params.id)
        if (!res) throw new Error('no data')
        if (error) throw new Error(error)
        await this.getUser(
          this.user.id !== res[0].user_from ? res[0].user_from : res[0].user_to
        )
      } catch (e) {
        console.log(e)
      }
    },

    async getUser(userId) {
      try {
        const { data: res, error } = await this.$supabase
          .from('users')
          .select('*')
          .eq('_id', userId)
        if (!res) throw new Error('no data')
        if (error) throw new Error(error)
        this.userTo = res[0]
        await this.getImage(userId)
      } catch (e) {
        console.log(e)
      }
    },

    async getImage(userID) {
      try {
        const { data: dataSigned, errorSigned } = await this.$supabase.storage
          .from('public')
          .createSignedUrl(`userProfile/${userID}.png`, 60)
        if (!dataSigned) throw new Error('no data')
        if (errorSigned) throw new Error(errorSigned)
        this.src = dataSigned.signedURL
      } catch (e) {
        console.log(e)
      }
    },

    updateStatusMessage(id, NewStatus) {
      this.$supabase
        .from('messages')
        .update({ status: NewStatus })
        .match({ _id: id })
        .then(() => true)
        .catch(() => false)
    },
  },
}
</script>

<style lang="scss" scoped>
section.container {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px 1fr auto;

  padding-bottom: 6px;

  header {
    width: 100%;
    height: 55px;

    grid-row: 1/2;

    background-color: $PrimaryColor;

    display: flex;
    align-items: center;

    padding: 0 5px;

    img {
      width: 45px;
      height: 45px;

      border-radius: 50%;

      margin-left: 10px;
    }

    h1 {
      @include bold-text($white);
      text-transform: none;
      margin-left: 10px;
    }
  }

  main.main {
    width: 96%;
    height: 100%;

    display: flex;
    flex-direction: column;

    padding: 10px 5px;
    margin: auto;
  }

  footer {
    grid-row: 3/4;
  }

  .wave-item {
    background-color: $PrimaryColor;
  }
}
</style>
