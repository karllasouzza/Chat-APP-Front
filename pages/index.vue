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
      SetUser: 'User/SetUser',
      toastSuccess: 'Notification/ToastSuccess',
      toastInfo: 'Notification/toastInfo',
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
            this.toastInfo('Auto logando...')
            const { data: user } = await getUser(authUser.id)

            if (!user) throw new Error('not auth')

            this.SetUser(user[0])

            this.toastSuccess(this.$t('Login.success.login'))
            return this.$router.push('/HomePage')
          }
        } else {
          const { data } = await getUser(this.user.id)

          if (!data) throw new Error('not logged')

          this.$router.push('/homePage')
        }
      } catch (e) {
        this.$router.push('/login')
      }
    },

    // http://localhost:3000/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjU1ODc5OTU3LCJzdWIiOiJjZWNmNzhiYS1iZmYwLTQ5YWMtYTVlOS04MzJiOThiYjQxZWQiLCJlbWFpbCI6ImthcmxsYS5zb3V6emEuY29udGF0b0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQifQ.kdDDWKg8pAvSq6UrufiSgx-TJh7TXffycsiexOgs5cQ&expires_in=3600&refresh_token=7F04V6zFjXJ5-H2PQJdvjQ&token_type=bearer&type=signup
  },
}
</script>

<style></style>
