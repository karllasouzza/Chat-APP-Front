<template>
  <nav class="navbar">
    <nuxt-link :to="localePath('/HomePage')">
      <IconHome
        v-if="extractLangInName($route.name) !== 'HomePage'"
        :title="$t('Icons.home')"
      />

      <div v-else class="label">
        <span>{{ $t('Navbar.home') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>

    <nuxt-link :to="localePath('/chats')">
      <IconStatus
        v-if="extractLangInName($route.name) !== 'chats'"
        :title="$t('Icons.chat')"
      />

      <div v-else class="label">
        <span>{{ $t('Navbar.chat') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>

    <nuxt-link :to="localePath('/profile')">
      <IconProfile
        v-if="extractLangInName($route.name) !== 'profile'"
        :title="$t('Icons.profile')"
      />

      <div v-else class="label">
        <span>{{ $t('Navbar.profile') }}</span>
        <IconDot :title="$t('Icons.dot')" />
      </div>
    </nuxt-link>
  </nav>
</template>

<script>
import IconHome from '../assets/icons/IconHome.vue'
import IconStatus from '../assets/icons/IconStatus.vue'
import IconProfile from '../assets/icons/IconProfile.vue'
import IconDot from '../assets/icons/IconDot.vue'

export default {
  components: { IconHome, IconStatus, IconProfile, IconDot },
  methods: {
    extractLangInName(name) {
      name = name.split('___')
      return name[0]
    },
  },
}
</script>

<style lang="scss" scoped>
nav.navbar {
  width: 100%;
  height: 48px;

  grid-row: 3/4;
  grid-column: 1/5;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 5;
  padding: 0px 15px 0 15px;

  background: $Neutral100;

  > a > svg {
    width: 25px;
    height: 25px;
  }

  .label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > span {
      @include bold-text($Secondary20);
      text-transform: none;

      font-size: 16px;
      text-decoration: none;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }

  a {
    text-decoration: none;
  }

  &::after {
    width: 100%;
    height: 40px;

    content: '';

    position: absolute;
    left: 6px;
    right: 0;
    bottom: 84%;
    margin: 0 auto;

    border-left: 9px solid $Neutral100;
    border-bottom: 9px solid $Neutral100;
    border-right: 9px solid $Neutral100;
    border-radius: 0 0 30px 30px;
  }
}
</style>
