<template>
  <div class="status">
    <figure>
      <div class="img"><More :title="$t('Icons.more_card')" /></div>
      <figcaption class="name">Criar status</figcaption>
    </figure>
    <ul class="statusList">
      <figure v-for="(card, index) in status" :key="index">
        <img :src="card.picture.thumbnail" :alt="card.title" />
        <figcaption class="name">{{ card.name.first }}</figcaption>
      </figure>
    </ul>
  </div>
</template>

<script>
import More from '~/components/Svgs/More.vue'

export default {
  components: { More },
  data() {
    return {
      status: [],
      quant: 5,
    }
  },

  fetch() {
    this.$axios
      .get('https://randomuser.me/api/?results=10')
      .then((response) => {
        this.status.push(...response.data.results)
      })
  },
}
</script>

<style lang="scss" scoped>
div.status {
  width: 100%;
  height: 100%;

  grid-row: 3/4;

  display: grid;
  grid-template-columns: 35px 1fr;
  align-items: center;

  > figure {
    grid-column: 1/2;
    z-index: 2;

    > figcaption {
      background: $white;
    }
  }
  ul.statusList {
    grid-column: 3/4;

    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;

    display: flex;
    align-items: center;

    overflow-x: scroll;
    overflow-y: hidden;

    > figure:first-child {
      margin-left: 45px;
    }
  }

  figure {
    min-width: 67px;
    max-width: 90px;
    height: 90px;

    margin: 0 5px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    img {
      &::after {
        content: 2;

        position: absolute;
        z-index: 1;

        width: 20px;
        height: 20px;

        background: red;
      }
    }

    img,
    .img {
      width: 60px;
      height: 60px;

      position: relative;

      border-radius: 40px 40px 40px 20px;

      box-shadow: 0 0 1px 2px rgb(0, 0, 0, 0.1);
    }
    .img {
      background: $PrimaryColor;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    &:first-child {
      margin-left: 0;
    }

    figcaption.name {
      font-size: 0.9rem;
    }
  }
}
</style>
