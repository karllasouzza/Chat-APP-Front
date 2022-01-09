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
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage)
    },
    pageOffset() {
      return this.maxPerPage * this.currentPage
    },
  },

  mounted() {
    const socket = io('http://localhost:4000')

    socket.on('message-created', (serverTask) => {
      this.messages.push(ModelMessage(serverTask.response))
    })

    // this.scrollTigger()

    // socket.on('message-updated', (serverTask) => {
    //   const localTask = this.messages.find(
    //     (localTask) => localTask.ID === serverTask.ID
    //   )
    //   localTask.CONTENT = serverTask.CONTENT
    // })

    // socket.on('message-removed', (serverTask) => {
    //   this.messages = this.messages.filter(
    //     (localTask) => localTask.ID !== serverTask.ID
    //   )
    // })
  },
  created() {
    if (this.user === null) {
      return this.$router.push('/login')
    }
  },
  methods: {
    // scrollTigger() {
    //   const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //       if (
    //         entry.intersectionRatio > 0 &&
    //         this.currentPage < this.pageCount
    //       ) {
    //         this.showLoader = true
    //         setTimeout(async () => {
    //           await this.$axios
    //             .$get(
    //               `/dev/messages/scroll/${this.maxPerPage + 1},${
    //                 this.currentPage + 1
    //               }`
    //             )
    //             .then((response) => {
    //               for (let i = 0; i < response.data.response.length; i++) {
    //                 this.messages.unshift(response.data.response[i])
    //               }
    //             })
    //           this.currentPage += 1
    //           this.showLoader = false
    //         }, 2000)
    //       }
    //     })
    //   })
    //   observer.observe(this.$refs.infiniteScrollTriggerH)
    // },

    infiniteHandler($state) {
      this.$axios
        .get(`/dev/messages/scroll/${this.maxPerPage},${this.currentPage + 1}`)
        .then((response) => {
          const data = response.data.data.response
          if (data.length) {
            this.currentPage += 1
            this.messages.unshift(...data.reverse())
            console.log(data)
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
