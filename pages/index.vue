<template>
  <div v-if="loaded" id="container">
    <UserGreet />
    <UsersStatus />

    <ul class="chats">
      <Cards
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @click.native="$router.push(`chat/${item.user._id}`)"
      />
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersStatus from '~/components/Status/UsersStatus.vue'
import Cards from '~/components/Chat/Cards.vue'

export default {
  name: 'HomePage',
  components: {
    UsersStatus,
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
    // await this.authUser()
    await this.fetchChats()
    this.subscribeChats()
  },
  destroyed() {
    this.unsubscribePosts()
  },

  methods: {
    async authUser() {
      try {
        const { data: user } = await this.$supabase
          .from('users')
          .select('*')
          .filter('_id', 'eq', this.user.app_metadata.id)

        if (!user) throw new Error('not loged')
      } catch (e) {
        if (!this.user.app_metadata.aud) {
          this.$router.push('/login')
        }
      }
    },

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
        .on('INSERT', (message) => {
          if (message.new) {
            return this.items.push(message.new)
          }
        })
        .on('DELETE', (message) => {
          console.log(message)
        })
        .subscribe()
    },

    unsubscribePosts() {
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



// "#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjQ4MDA2NDYyLCJzdWIiOiI0Mjk0ZjBmMi01NmM0LTQzZTktODI0ZC1mM2MwYTQ0ODIyNDQiLCJlbWFpbCI6ImthcmxsYS5zb3V6emE3QGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCJ9.rzXuuf2gcMwOdtSv-fxdBqAdsl-3RXST6YnZGPXbj5o
// &expires_in=3600
// &refresh_token=YLkvfiia5szjMcEOHt3uyA
// &token_type=bearer&type=signup"
