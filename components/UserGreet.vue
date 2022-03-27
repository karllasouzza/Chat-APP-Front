<template>
  <header class="greet">
    <span>
      <Strong>
        {{ $t('Greet.hello') }}
        <b>{{ userName[0].toUpperCase() + userName.slice(1) }}</b></Strong
      >
    </span>
    <IconAddFriends
      :active="notification"
      :title="$t('Icons.addFriends')"
      @click.native="$router.push('/addFriends')"
    />
  </header>
</template>

<script>
import { mapState } from 'vuex'

import IconAddFriends from '~/components/Svgs/IconAddFriends.vue'

export default {
  components: {
    IconAddFriends,
  },
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
  height: 100%;

  grid-row: 1;

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
      @include bold-text($black);
      text-transform: none;
      b {
        @include bold-text($PrimaryColor);
        text-transform: none;
      }
      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  svg {
    width: 25px;
    height: 25px;

    cursor: pointer;
  }
}
</style>
