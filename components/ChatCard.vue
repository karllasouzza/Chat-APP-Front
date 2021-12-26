<template>
  <div class="card">
    <header>
      <div>
        <figure>KS</figure>
        <figcaption>Karlla</figcaption>
      </div>
      <div>
        <MoreCard />
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
      default: '',
      required: true,
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

  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.315);

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
        width: 40%;

        figure {
          width: 30px;
          height: 30px;

          border-radius: 50%;

          background: red;

          display: flex;
          align-items: center;
          justify-content: center;
        }
        figcaption {
          font-size: large;
          font-weight: bold;

          font-family: 'Raleway';
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

    padding: 0 5px;
  }
}
</style>
