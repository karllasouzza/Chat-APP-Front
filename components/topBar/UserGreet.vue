<template>
  <header class="greet">
    <span>
      <Strong>
        {{ $t('Greet.hello') }}
        <b>{{ name[0].toUpperCase() + name.slice(1) }}</b></Strong
      >
    </span>
    <!-- <AccountCircle @click.native="$router.push('/profile')" /> -->
  </header>
</template>

<script>
// import AccountCircle from '~/assets/icons/AccountCircle'

export default {
  // components: { AccountCircle },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
header.greet {
  width: 100%;
  height: 61px;

  background: $Neural99;
  // @include Elevation_1;

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
