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
import { mapState } from 'vuex'
export default {
  name: 'Home',
  layout: 'Primary',
  data() {
    return {
      messages: '',
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
  created() {
    if (this.user === null) {
      return this.$router.push('/login')
    }
    setInterval(() => {
      this.$fetch()
    }, 800)
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
