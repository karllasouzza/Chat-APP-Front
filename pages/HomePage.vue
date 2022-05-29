<template>
  <div v-if="loaded" id="container">
    <UserGreet />

    <ul class="chats">
      <Cards
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @click.native="$router.push(`chat/${item._id}`)"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cards from '~/components/Chat/Cards.vue'

export default {
  name: 'HomePage',
  components: {
    Cards,
  },
  layout: 'WithNav',
  data() {
    return {
      items: [],
      loaded: false,
      subscriptionChats: undefined,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.User.userID,
    }),
  },
  async created() {
    await this.fetchChats()
    this.subscribeChats()
  },
  destroyed() {
    this.unsubscribeChats()
  },

  methods: {
    async fetchChats() {
      const { data: chats } = await this.$supabase
        .from('chats')
        .select('*')
        .or(
          `user_to.eq.${this.user},user_from.eq.${this.user},and(status.eq.Accepted)`
        )
      this.items = chats
      this.loaded = true
    },

    subscribeChats() {
      this.subscriptionChats = this.$supabase
        .from('pub_chats')
        .on('INSERT', (chat) => {
          if (chat.new) {
            return this.items.push(chat.new)
          }
        })
        .on('DELETE', (chat) => {
          const index = this.items.indexOf(chat)
          this.items.splice(index, 1)
        })
        .subscribe()
    },

    unsubscribeChats() {
      this.$supabase.removeSubscription(this.subscriptionChats)
    },
  },
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 3/4;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 45px 5px 90px 40px 1fr;
}

.chats {
  grid-row: 5/5;

  overflow-y: scroll;
}
</style>
