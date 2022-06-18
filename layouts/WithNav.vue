<template>
  <div id="APP">
    <Nuxt />
    <NavBar />
    <VLibras />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { VLibras } from '@vue-a11y/vlibras'
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'LayoutWithNavBar',
  components: { VLibras, NavBar },
  head() {
    return this.$nuxtI18nHead()
  },
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
        if (!this.user) throw new Error('not logged')

        const { data: user } = await this.$supabase
          .from('users')
          .select('*')
          .filter('_id', 'eq', this.user)

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

<style scoped>
#__nuxt {
  width: 100%;
  height: 100%;
}

#__layout {
  width: 100%;
  height: 100%;
}

#APP {
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 10px 1fr 10px;
  grid-template-rows: 5px 1fr 40px 5px;

  overflow-y: scroll;
}
</style>
