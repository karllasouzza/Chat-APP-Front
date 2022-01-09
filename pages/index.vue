<template>
  <main
    ref="main"
    :class="showLoader ? 'main animationScrollBeforeRender' : ' main'"
  >
    <!-- v-for="(n, index) in pageOffset" :key="index" -->
    <!-- <header>
      <div ref="infiniteScrollTriggerH"></div>
      <div v-if="showLoader" class="scroll-loader">CARREGANDOOOOOOOOOO</div>
    </header> -->
    <infinite-loading
      v-if="showLoader"
      spinner="waveDots"
      direction="top"
      color="red"
      @infinite="infiniteHandler"
    ></infinite-loading>

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
  </main>
</template>

<script>
import { io } from 'socket.io-client'

import { mapState } from 'vuex'

import InfiniteLoading from 'vue-infinite-loading'

import ModelMessage from '~/static/Models/ModelMessage'

export default {
  name: 'HomePage',
  components: {
    InfiniteLoading,
  },
  layout: 'ChatLayout',
  data() {
    return {
      messages: [],

      // InfiniteScroll
      currentPage: 1,
      maxPerPage: 7,
      totalResults: 100,
      showLoader: false,
    }
  },

  async fetch() {
    await this.$axios
      .$get(`/api/messages/scroll/${this.maxPerPage},${this.currentPage}`)
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
  },

  mounted() {
    const socket = io('https://chat-app-karlla.herokuapp.com/')

    socket.on('message-created', (serverTask) => {
      this.messages.push(ModelMessage(serverTask.response))
    })
  },
  created() {
    if (this.user === null) {
      return this.$router.push('/login')
    }
  },
  methods: {
    infiniteHandler($state) {
      this.$axios
        .get(`/api/messages/scroll/${this.maxPerPage},${this.currentPage + 1}`)
        .then((response) => {
          const data = response.data.data.response
          if (data.length) {
            this.currentPage += 1
            this.messages.unshift(...data.reverse())
            $state.loaded()
          } else {
            $state.complete()
          }
        })
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
    background-color: #360c8a;
  }
}

.animationScrollBeforeRender {
  transition: all 0.8s ease-in-out;
  -webkit-transition: all 0.8s ease-in-out;
  scroll-behavior: smooth;
}
</style>
