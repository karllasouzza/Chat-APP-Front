<template>
  <div id="input">
    <input
      :v-model="value"
      :type="passwordChange"
      :placeholder="placeholder"
      :title="title"
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
import HidePass from '~/components/Svgs/HidePass.vue'
import ShowPass from '~/components/Svgs/ShowPass.vue'
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
@import '../static/Scss/mixins.scss';
@import '../static/Scss/color.scss';
@import '../static/Scss/transitions.scss';

#input {
  width: 88%;
  height: 40px;

  border: none;
  border: 1px solid $black;
  border-radius: 8px;
  position: relative;

  @include placeholder(#000);

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
    border-radius: 8px;
    padding: 5px;
    box-shadow: 0 0 0 0;
    outline: 0;
  }
}
</style>
