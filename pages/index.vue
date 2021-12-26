<template>
  <main>
    <ChatCard
      v-for="(item, index) in messages.content"
      :key="index"
      :text="item.CONTENT"
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
    this.messages = await this.$axios.$get('/dev/messages')
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
