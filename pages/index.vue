<template>
  <div>loading</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoadingPage',
  computed: {
    ...mapState({
      user: (state) => state.User.userID,
    }),
  },
  async created() {
    await this.authUser()
  },

  methods: {
    async authUser() {
      try {
        if (!this.user.app_metadata?.aud) throw new Error('not logged')

        const { data: user } = await this.$supabase
          .from('users')
          .select('*')
          .filter('_id', 'eq', this.user?.app_metadata.id)

        if (!user) throw new Error('not logged')

        this.$router.push('/')
      } catch (e) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style></style>
