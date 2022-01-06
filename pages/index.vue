<template>
  <main>
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
    />
  </main>
</template>

<script>
import { io } from 'socket.io-client'

import { mapState } from 'vuex'

export default {
  name: 'HomePage',

  layout: 'ChatLayout',

  data() {
    return {
      messages: {},
    }
  },

  async fetch() {
    const headers = { 'Content-Type': 'application/json' }
    await this.$axios.$get('/dev/messages', { headers }).then((response) => {
      this.messages = response.data.response
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
    const socket = io('http://localhost:4000')

    socket.on('message-created', (serverTask) => {
      console.log(serverTask.Response.response)
      this.messages.push(serverTask.Response.response)
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

  display: flex;
  flex-direction: column;
}
</style>
