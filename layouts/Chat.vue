<template>
  <div id="APP">
    <Nuxt />
    <PushMessage />
    <VLibras />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { VLibras } from '@vue-a11y/vlibras'
import PushMessage from '~/components/PushMessage.vue'
export default {
  name: 'ChatLayout',
  components: { PushMessage, VLibras },
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
      } catch (e) {
        this.$router.push('/login')
      }
    },
  },
  async render() {
    return await this.authUser()
  },
}
</script>

<style lang="scss" scoped>
#__nuxt {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 10px 1fr 10px;
  background-color: $PrimaryColor;
}

#__layout {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 2/3;
}

#APP {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

.main {
  grid-row: 1/2;
  border-radius: 15px 15px 0 0;
  background: $white;
}

header {
  grid-row: 2/3;
  position: sticky;
  bottom: 0;
}
</style>
