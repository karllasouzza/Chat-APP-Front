<template>
  <main>
    <ChatCard
      v-for="(item, index) in messages.content"
      :key="index"
      :text="item.CONTENT"
      :user-i-d="item.ID_USERS"
    />
  </main>
</template>

<script>
import io from 'socket.io-client'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  layout: 'Primary',
  data() {
    return {
      messages: [],
    }
  },
  async fetch() {
    const headers = { 'Content-Type': 'application/json' }
    this.messages = await this.$axios.$get('/dev/messages', { headers })
  },
  fetchOnServer: false,
  fetchDelay: 200,
  computed: {
    ...mapState({
      user: (state) => state.User.user,
    }),
  },

  mounted() {
    const socket = io('http://127.0.0.1:4000')

    socket.on('message-created', (serverTask) => {
      this.messages.push(serverTask)
    })

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
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;

  overflow-x: auto;
}
</style>
