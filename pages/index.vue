<template>
  <div>loading</div>
</template>

//
<script>
import { mapActions } from 'vuex'
import { getUserByToken } from '~/utils/Supabase/auth.js'
import { getUser } from '~/utils/Supabase/user.js'

export default {
  name: 'LoadingPage',
  data() {
    return {
      user: this.$supabase.auth.user(),
    }
  },
  async created() {
    await this.authUser()
  },
  methods: {
    ...mapActions({
      toastSuccess: 'Notification/ToastSuccess',
    }),
    async authUser() {
      try {
        const hash = this.$route.hash.replace('=', '&').split('&')
        if (hash.length > 1) {
          const { user: authUser, error } = await getUserByToken(hash[1])
          if (!authUser) throw new Error('not logged')
          if (error) throw new Error(error)

          if (authUser.id) {
            this.toastSuccess('Email Confirmado com sucesso!!')
            // this.$router.push('/login')
          }
        }

        const { data } = await getUser(this.user.id)

        if (!data) throw new Error('not logged')

        this.$router.push('/homePage')
      } catch (e) {
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style></style>
