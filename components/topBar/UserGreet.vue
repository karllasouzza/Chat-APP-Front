<template>
  <header class="greet">
    <span>
      <Strong>
        {{ $t('Greet.hello') }}
        <b>{{ userName[0].toUpperCase() + userName.slice(1) }}</b></Strong
      >
    </span>
    <AccountCircle @click.native="$router.push('/profile')" />
  </header>
</template>

<script>
import { mapState } from 'vuex'
import AccountCircle from '~/assets/icons/AccountCircle'

export default {
  components: { AccountCircle },
  data() {
    return {
      userName: 'karlla',
      notification: false,
    }
  },
  computed: {
    ...mapState({
      userID: (state) => state.User.userID,
    }),
  },
  async created() {
    await this.getUserByID()
  },
  methods: {
    async getUserByID() {
      const { data: user } = await this.$supabase
        .from('users')
        .select('name')
        .filter('_id', 'eq', this.userID)
      if (user) {
        const userSplited = user[0].name.split(' ')
        this.userName = userSplited[0]
      }
    },
  },
}
</script>

<style lang="scss" scoped>
header.greet {
  width: 100%;
  height: 61px;

  background: $Neural99;

  grid-row: 2/3;
  grid-column: 1/4;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    width: 70%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    strong {
      height: auto;
      @include title_medium;
      b {
        color: $Primary40;
      }
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  svg {
    cursor: pointer;
  }
}
</style>
