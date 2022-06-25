<template>
  <div id="APP">
    <Nuxt />
    <NavBar />
    <VLibras />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import { VLibras } from '@vue-a11y/vlibras'
import NavBar from '~/components/NavBar.vue'

export default {
  name: 'LayoutWithNavBar',
  components: { VLibras, NavBar },
  data() {
    return {
      user: this.$supabase.auth.user(),
    }
  },
  head() {
    return this.$nuxtI18nHead()
  },
  async created() {
    await this.authUser()
    await this.loadUser()
  },

  methods: {
    ...mapMutations({
      loadUser: 'User/loadUser',
    }),

    authUser() {
      try {
        if (!this.user.id) throw new Error('not logged')
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
