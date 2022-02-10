<template>
  <nav class="navbar">
    <nuxt-link :to="localePath('/')">
      <IconHome v-if="path !== '/'" />
      <div v-else class="label">
        <span>{{ $t('Navbar.home') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>

    <nuxt-link :to="localePath('/chats')">
      <IconChat v-if="path !== '/chats'" />
      <div v-else class="label">
        <span>{{ $t('Navbar.chat') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>

    <nuxt-link :to="localePath('/search')">
      <IconSearch v-if="path !== '/search'" />
      <div v-else class="label">
        <span>{{ $t('Navbar.search') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>

    <nuxt-link :to="localePath('/profile')">
      <IconProfile v-if="path !== '/profile'" />
      <div v-else class="label">
        <span>{{ $t('Navbar.profile') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>
  </nav>
</template>

<script>
import IconHome from './Svgs/IconHome.vue'
import IconChat from './Svgs/IconChat.vue'
import IconSearch from './Svgs/IconSearch.vue'
import IconProfile from './Svgs/IconProfile.vue'
import IconDot from './Svgs/IconDot.vue'

export default {
  components: { IconHome, IconChat, IconSearch, IconProfile, IconDot },
  data() {
    return {
      path: this.$route.path,
    }
  },
}
</script>

<style lang="scss" scoped>
nav.navbar {
  width: 100%;
  height: 40px;

  grid-row: 3/4;
  grid-column: 3/4;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > a > svg {
    width: 30px;
    height: 30px;
  }

  .label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > span {
      @include bold-text($Secondary);
      text-decoration: none;
    }
  }

  a {
    text-decoration: none;
  }
}
</style>
