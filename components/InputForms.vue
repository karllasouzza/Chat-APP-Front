<template>
  <div class="Input">
    <input
      :value="value"
      :type="passwordChange"
      :placeholder="placeholder"
      :title="title"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="type === 'password'">
      <transition name="Opacity">
        <ShowPass
          v-if="passwordChange == 'password'"
          @click.native="passwordChange = 'text'"
        />

        <HidePass v-else @click.native="passwordChange = 'password'" />
      </transition>
    </div>
  </div>
</template>

<script>
import HidePass from '~/assets/icons/HidePass.vue'
import ShowPass from '~/assets/icons/ShowPass.vue'
export default {
  components: {
    HidePass,
    ShowPass,
  },
  props: {
    value: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      passwordChange: this.type,
    }
  },
}
</script>

<style lang="scss" scoped>
.Input {
  width: 88%;
  height: 40px;

  border: none;
  border: 1px solid $Neutral0;
  border-radius: 10px;
  position: relative;

  @include placeholder($Neutral100);

  svg {
    width: 20px;
    height: 20px;

    position: absolute;
    bottom: 0;
    top: 0;
    right: 5px;
    margin: auto 0;

    cursor: pointer;
  }

  > input {
    width: 100%;
    height: 100%;

    border: none;
    border-radius: 10px;
    padding: 5px;
    box-shadow: 0 0 0 0;
    outline: 0;
  }
}
</style>
