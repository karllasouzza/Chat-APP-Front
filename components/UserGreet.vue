<template>
  <header class="greet">
    <span>
      <Strong>
        {{ $t('Greet.hello') }} <b>{{ userName }}</b></Strong
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
    }
    b {
      @include bold-text($PrimaryColor);
    }
  }
}
</style>
