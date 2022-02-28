<template>
  <header class="greet">
    <span>
      <Strong>
        {{ $t('Greet.hello') }}
        <b>{{ userName[0].toUpperCase() + userName.slice(1) }}</b></Strong
      >
    </span>
    <Notifications
      :active="notification"
      :title="$t('Icons.notification')"
      @click.native="$router.push('/notices')"
    />
  </header>
</template>

<script>
import Notifications from '~/components/Svgs/Notifications.vue'

export default {
  components: {
    Notifications,
  },
  data() {
    return {
      userName: 'karlla',
      notification: false,
    }
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
  }
}
</style>
