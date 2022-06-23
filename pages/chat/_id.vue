<template>
  <section class="container">
    <ReturnSmallChat
      v-if="indexFriendProfile > -1"
      :label="friendsProfiles[indexFriendProfile].name"
      :src="friendsProfiles[indexFriendProfile].src"
      to="/homePage"
    />

    <main
      v-chat-scroll="{
        always: false,
        smooth: true,
        notSmoothOnInit: true,
      }"
      class="main"
    >
      <ChatCard
        v-for="(item, index) in messages"
        :key="index"
        v-observe-visibility="item.user_from !== user.id ? Viewer(item) : ''"
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
import { mapState } from 'vuex'

import PushMessage from '~/components/PushMessage.vue'
import ReturnSmallChat from '~/components/topBar/ReturnSmallChat.vue'
// import ModelMessage from '~/static/Models/ModelMessage'

export default {
  name: 'ChatPage',
  components: { PushMessage, ReturnSmallChat },
  layout: 'ChatLayout',
  data() {
    return {
      messages: [],

      onBottom: false,
      newMessage: false,
      quantNewMessage: 0,
      user: this.$supabase.auth.user(),
      indexFriendProfile: -1,
      subscriptionMessages: undefined,
    }
  },
  computed: {
    ...mapState({
      friendsProfiles: (state) => state.FriendsProfiles.profiles,
      chats: (state) => state.Chats.userChats,
    }),
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
          if (message.new.user_from === this.user.id) {
            setTimeout(() => {
              const index = this.messages
                .map((msg) => msg._id)
                .indexOf(message.new._id)
              this.messages[index].status = message.new.status
            }, 800)
          }
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

    getChat() {
      try {
        const chat = this.chats.filter(
          (chat) => chat._id === this.$route.params.id
        )
        this.indexFriendProfile = this.friendsProfiles
          .map((profile) => profile._id)
          .indexOf(
            this.user.id !== chat[0].user_from
              ? chat[0].user_from
              : chat[0].user_to
          )
      } catch (e) {
        console.log(e)
      }
    },
    async updateStatusMessage(idOut, statusOut) {
      await this.$supabase
        .from('messages')
        .update({ status: statusOut })
        .match({ _id: idOut })
    },

    Viewer(message) {
      if (message.user_from !== this.user.id && message.status !== 'View') {
        this.updateStatusMessage(message._id, 'View')
      }
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
  grid-template-rows: 62px 1fr auto;

  padding-bottom: 6px;
  background: $Neural99;

  header {
    grid-row: 1/2;
  }

  main.main {
    width: 96%;
    height: 100%;

    display: flex;
    flex-direction: column;

    padding: 10px 5px;
    margin: auto;
    background: $Neural99;
  }

  footer {
    grid-row: 3/4;
  }
}
</style>
