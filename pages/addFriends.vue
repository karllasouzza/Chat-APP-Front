<template>
  <section>
    <form @submit.prevent="search">
      <input v-model="userEmail" type="text" />
      <button type="submit">ADD</button>
    </form>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <p>{{ user.name }}</p>
        <span>{{ user.email }}</span>
        <button @click="addChat(user._id)">CHAT</button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userEmail: '',
      users: [],
    }
  },
  methods: {
    async search() {
      try {
        const { data, error } = await this.$supabase
          .from('users')
          .select('_id, name, email')
          .eq('email', this.userEmail)

        if (error) throw new Error(error)
        if (!data) throw new Error('no users')

        const findEqual = (item, index, arr) => item.email === data[0].email

        if (!this.users.find(findEqual)) {
          this.users.push(data[0])
        }
      } catch (e) {
        console.log(e)
      }
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

<style></style>
