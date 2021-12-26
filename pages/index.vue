<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'Primary',
  computed: {
    ...mapState({
      user: (state) => state.User.user,
    }),
  },

  created() {
    if (this.user === null) {
      return this.$router.push('/login')
    }
  },
}
</script>
