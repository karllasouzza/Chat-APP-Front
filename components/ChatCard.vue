<template>
  <article
    :class="
      userX.id === userID
        ? before
          ? 'Sequence MyCard'
          : 'MyCard'
        : before
        ? 'Sequence Card'
        : 'Card'
    "
  >
    <span>
      {{ text }}
    </span>
    <footer>
      <IconDot v-if="status === 'View'" color="green" />
      <IconDot v-else color="yellow" />
    </footer>
  </article>
</template>

<script>
import IconDot from './Svgs/IconDot.vue'
export default {
  components: { IconDot },
  props: {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    before: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      userX: this.$supabase.auth.user(),
    }
  },
}
</script>

<style lang="scss" scoped>
.Card,
.MyCard {
  width: fit-content;

  min-width: 45px;
  max-width: 85%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  align-self: flex-start;

  border-radius: 0px 25px 25px 25px;
  margin: 10px 5px;
  padding: 5px 5px;

  box-shadow: 0 0 2px 0.3px rgba(0, 0, 0, 0.212);
  background: $white;

  span {
    width: 100%;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-family: 'Ubuntu', sans-serif;

    vertical-align: middle;
    text-align: start;
    word-wrap: break-word;
    line-height: 1.3333;

    padding: 10px 5px;
    font-size: 14px;
  }

  footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    svg {
      margin: 0 2px;
    }
  }
}

.MyCard {
  border-radius: 25px 25px 0px 25px;

  background: $Third;
  align-self: flex-end;

  footer {
    svg {
      transform: scaleX(-1);
    }
  }
}

// .Sequence {
//   min-width: 80px;
//   min-height: 50px;
//   margin-top: 0px;
//   border-radius: 20px;

//   footer {
//     margin-right: 20px;
//     svg {
//       path {
//         border-radius: 50%;
//       }
//     }
//   }
// }
</style>
