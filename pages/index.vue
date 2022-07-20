<template>
  <figure class="splashScreen">
    <img src="@/assets/images/splashScreen.png" :class="fluidClass" alt="" />
    <figcaption>Chat-app</figcaption>
  </figure>
</template>

<script>
import { mapActions } from 'vuex'
import { getUserByToken } from '~/utils/Supabase/auth.js'
import { getUser } from '~/utils/Supabase/user.js'

export default {
  name: 'LoadingPage',
  data() {
    return {
      user: this.$supabase.auth.user(),
      fluidClass: '',
      interval: 0,
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
    openTimeout() {
      return new Promise((resolve, reject) => setTimeout(resolve(), 700))
    },
    closeTimeout() {
      clearTimeout(this.interval)
    },
    async authUser() {
      this.fluidClass = 't15'
      this.interval = await this.openTimeout()
      this.closeTimeout()

      try {
        const hash = this.$route.hash.replace('=', '&').split('&')

        if (hash.length > 1) {
          this.fluidClass = 't30'
          this.interval = await this.openTimeout()
          this.closeTimeout()

          const { user: authUser, error } = await getUserByToken(hash[1])
          if (!authUser) throw new Error('not logged')
          if (error) throw new Error(error)

          if (authUser.id) {
            this.toastSuccess('Email Confirmado com sucesso!!')
            this.toastInfo('Auto logando...')
            this.fluidClass = 't45'
            this.interval = await this.openTimeout()
            this.closeTimeout()

            const { data: user } = await getUser(authUser.id)

            if (!user) throw new Error('not auth')

            this.SetUser(user[0])

            this.toastSuccess(this.$t('Login.success.login'))
            this.fluidClass = 't60'
            this.interval = await this.openTimeout()
            this.closeTimeout()

            return this.$router.push('/HomePage')
          }
        } else {
          this.fluidClass = 't45'
          this.interval = await this.openTimeout()
          this.closeTimeout()

          const { data } = await getUser(this.user.id)

          if (!data) throw new Error('not logged')

          this.fluidClass = 't60'
          this.interval = await this.openTimeout()
          this.closeTimeout()

          this.$router.push('/homePage')
        }
      } catch (e) {
        this.fluidClass = 't60'
        this.interval = await this.openTimeout()
        this.closeTimeout()

        this.$router.push('/login')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.splashScreen {
  width: 100%;
  height: 100%;

  display: flex;

  > img {
    width: 100%;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    object-fit: cover;
    transition: all 0.7s linear;
    z-index: 2;
  }

  figcaption {
    width: 50%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;

    margin: auto;

    color: $Primary60;
      @include title_large();
      font-size: 28px;
  }

  .t15 {
    transform: translateY(-15%);
  }
  .t30 {
    transform: translateY(-30%);
  }
  .t45 {
    transform: translateY(-45%);
  }
  .t60 {
    transform: translateY(-60%);
  }
}
</style>
