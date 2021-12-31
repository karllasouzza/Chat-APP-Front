<template>
  <div class="card">
    <header>
      <div>
        <figure :class="imageToProfile(user.response[0].NAME)"></figure>
        <figcaption>{{ user.response[0].NAME }}</figcaption>
      </div>
      <div>
        <MoreCard v-if="text.length > 180" />
      </div>
    </header>
    <span>
      {{ text }}
    </span>
  </div>
</template>

<script>
import MoreCard from '~/components/Svgs/MoreCard.vue'
export default {
  components: {
    MoreCard,
  },

  props: {
    text: {
      type: String,
      required: true,
    },
    userID: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      user: { response: [{ NAME: 'Default User' }] },
    }
  },
  async fetch() {
    const headers = { 'Content-Type': 'application/json' }
    this.user = await this.$axios.$get(`/dev/users/${this.userID}`, {
      headers,
    })
  },
  created() {
    this.$fetch()
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
.card {
  width: 90%;
  height: fit-content;
  min-height: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  border-radius: 10px;
  margin: 20px auto;
  padding: 5px 5px;

  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.212);

  header {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      justify-content: space-around;

      &:first-child {
        width: fit-content;
        min-width: 80px;
        max-width: 75%;
        justify-content: space-between;

        figure {
          width: 35px;
          height: 35px;

          border-radius: 10px;

          background-color: rgb(111, 0, 255);

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
</style>
