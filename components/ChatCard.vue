<template>
  <article
    :class="
      userX.ID === userID
        ? before
          ? 'Sequence MyCard'
          : 'MyCard'
        : before
        ? 'Sequence Card'
        : 'Card'
    "
  >
    <header v-if="!before">
      <!-- <header> -->
      <div>
        <figure :class="imageToProfile(user.response[0].NAME)"></figure>
        <!-- <figcaption>{{ user.response[0].NAME }}</figcaption> -->
        <figcaption>{{ user.response[0].NAME }}</figcaption>
      </div>
      <div>
        <!-- <MoreCard v-if="source.CONTENT.length > 180" /> -->
        <MoreCard v-if="text.length > 180" />
      </div>
    </header>
    <span>
      <!-- {{ source.CONTENT }} -->
      {{ text }}
    </span>
  </article>
</template>

<script>
import { mapState } from 'vuex'
// import MoreCard from '~/components/Svgs/MoreCard.vue'

export default {
  // components: {
  //   MoreCard,
  // },

  props: {
    text: {
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
    // source: {
    //   type: Object,
    //   default() {
    //     return {
    //       ID: '',
    //       CONTENT: '',
    //       DATACREATE: '',
    //       ID_USERS: '',
    //     }
    //   },
    // },
  },

  data() {
    return {
      user: { response: [{ NAME: 'Default User' }] },
    }
  },
  async fetch() {
    const headers = { 'Content-Type': 'application/json' }
    await this.$axios
      // .$get(`/dev/users/${this.source.ID_USERS}`, {
      .$get(`/dev/users/${this.userID}`, {
        headers,
      })
      .then((response) => {
        this.user = response.data
      })
  },
  computed: {
    ...mapState({
      userX: (state) => state.User.user[0],
    }),
  },
  created() {
    this.$fetch()
  },
  destroyed() {
    console.log('Compoenente desmontado')
  },
  methods: {
    imageToProfile(name) {
      name = name[0]
      name = name.toLowerCase()
      return `image_${name}`
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../static/Scss/color.scss';
.Card,
.MyCard {
  width: fit-content;
  max-width: 85%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  align-self: flex-start;

  border-radius: 0px 10px 10px 10px;
  margin: 10px 10px;
  padding: 5px 5px;

  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.212);
  background: #d7ccff;

  header {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      min-width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      &:first-child {
        width: fit-content;
        min-width: 140px;
        justify-content: flex-start;

        figure {
          width: 35px;
          height: 35px;

          border-radius: 10px;

          display: flex;
          align-items: center;
          justify-content: center;
        }
        figcaption {
          width: fit-content;
          margin-left: 5px;

          font-size: 14px;
          font-weight: bold;
          font-family: 'Raleway';
          vertical-align: middle;
        }
      }
    }
  }

  span {
    width: 100%;
    height: fit-content;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    // white-space: pre-wrap;
    vertical-align: middle;
    text-align: start;
    word-wrap: break-word;
    line-height: 1.3333;

    padding: 10px 5px;
    font-size: 14px;
  }
}

.MyCard {
  border-radius: 10px 10px 0px 10px;
  background: #887cc9;
  align-self: flex-end;
}

.Sequence {
  min-height: 50px;
  margin-top: 0px;
}
</style>
