<template>
  <div v-if="loaded" id="container">
    <UserGreet :name="user.name.split(' ')[0]" />

    <ul v-if="chats.length > 0" class="chats">
      <Cards
        v-for="(item, index) in chats"
        :key="index"
        :item="item"
        @click.native="$router.push(`chat/${item._id}`)"
      />
    </ul>

    <AddUsers @click.native="$router.push('/addFriends')" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cards from '~/components/Chat/Cards.vue'
import AddUsers from '~/components/Chat/AddUsers.vue'
import UserGreet from '~/components/topBar/UserGreet.vue'
import { fetchChats } from '~/utils/Supabase/chats'
import { supabase } from '~/plugins/supabase'

export default {
  name: 'HomePage',
  components: {
    Cards,
    AddUsers,
    UserGreet,
  },
  layout: 'WithNav',
  data() {
    return {
      loaded: false,
      subscriptionChats: undefined,
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.User.user,
      chats: (state) => state.Chats.userChats,
    }),
  },
  async created() {
    await this.getChats()
    this.subscribeChats()
  },
  destroyed() {
    this.unsubscribeChats()
  },

  methods: {
    ...mapActions({
      SetUserChats: 'Chats/SetUserChats',
      SetNewUserChats: 'Chats/SetNewUserChats',
      DropUserChat: 'Chats/DropUserChat',
    }),

    async getChats() {
      try {
        this.loaded = true
        const { data: chats, error } = await fetchChats(this.user._id)

        if (error) throw new Error(error)

        if (chats.length > 0) {
          this.SetUserChats(chats)
        }
      } catch (e) {}
    },

    subscribeChats() {
      this.subscriptionChats = supabase
        .from('pub_chats')
        .on('INSERT', (chat) => {
          if (chat.new) {
            return this.SetNewUserChats(chat.new)
          }
        })
        .on('DELETE', (chat) => {
          const index = this.chats.indexOf(chat)
          console.log(chat, index)
          this.DropUserChat(index)
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

  grid-row: 1/3;
  grid-column: 1/4;

  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: auto 5px 90px 5px 1fr;

  position: relative;

  background: $Neutral99;
}

.chats {
  grid-row: 5/5;
  grid-column: 2/3;

  overflow-y: scroll;
}
</style>
