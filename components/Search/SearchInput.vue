<template>
  <form class="search" @submit.prevent="$emit('submit')">
    <input
      type="email"
      :placeholder="label"
      @input="$emit('input', $event.target.value)"
    />
    <button type="submit">
      <SearchI />
    </button>
  </form>
</template>

<script>
import SearchI from '~/assets/icons/SearchI.vue'
export default {
  components: { SearchI },
  props: {
    label: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  grid-row: 2/3;
  grid-column: 2/3;

  width: 100%;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: $Tertiary90;
  border-radius: 30px;

  input {
    width: 75%;
    height: 80%;
    border-radius: 30px;
    background: transparent;
    border: none;
    margin: auto;

    padding: 10px;
  }

  button {
    width: 45px;
    height: 45px;

    border-radius: 50%;
    background: $Tertiary90;
    @include Elevation_1;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
