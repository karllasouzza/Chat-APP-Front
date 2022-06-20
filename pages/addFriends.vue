<template>
  <section id="container">
    <ReturnSmall label="Add Friends" to="/homePage" />
    <SearchInput
      v-model="userEmail"
      label="digite o email de seu amigo"
      @submit.native.prevent="search"
    />
    <ul class="cards">
      <CardsAddUser
        v-for="(user, index) in users"
        :key="index"
        :user="user"
        @click.native="addChat(user._id)"
      />
    </ul>
  </section>
</template>

<script>
import SearchInput from '~/components/Search/SearchInput.vue'
import ReturnSmall from '~/components/topBar/ReturnSmall.vue'
import CardsAddUser from '~/components/Chat/CardsAddUser.vue'

export default {
  components: { SearchInput, ReturnSmall, CardsAddUser },
  data() {
    return {
      userEmail: '',
      users: [],

      mySelf: this.$supabase.auth.user(),
    }
  },
  methods: {
    async search() {
      try {
        if (this.userEmail === this.mySelf.email) throw new Error('your email')

        if (this.userEmail === this.mySelf.email) throw new Error('your email')

        const { data, error } = await this.$supabase
          .from('users')
          .select('_id, name, email, bio')
          .eq('email', this.userEmail)

        if (error) throw new Error(error)
        if (!data) throw new Error('no users')

        const findEqual = (item, index, arr) => item.email === data[0].email

        const findUserChats = await this.fetchChats(data[0]._id)

        if (!this.users.find(findEqual) && findUserChats === 0) {
          this.users.push(data[0])
        }
      } catch (e) {
        console.log(e)
      }
    },
    async fetchChats(id) {
      const { data: chats } = await this.$supabase
        .from('chats')
        .select('*')
        .or(`user_to.eq.${id},user_from.eq.${id},and(status.eq.Accepted)`)

      return chats.length
    },

    async addChat(toUserId) {
      const user = await this.$supabase.auth.user()
      if (!user) this.$router.push('/login')
      const { data, error } = await this.$supabase
        .from('chats')
        .insert([{ user_from: user.id, user_to: toUserId }])
      console.log('[DATA]', data)
      console.log('[ERROR]', error)
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
  grid-template-rows: 5px 64px 55px 5px 1fr;

  position: relative;

  .search {
    grid-row: 3/4;
    grid-column: 2/3;
  }

  .cards {
    grid-row: 5/6;
    grid-column: 2/3;

    width: 100%;
    height: 100%;
  }
}
</style>
