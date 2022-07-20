<template>
  <div class="status">
    <figure>
      <div class="img"><More :title="$t('Icons.more_card')" /></div>
      <figcaption class="name">Criar status</figcaption>
    </figure>
    <ul class="statusList">
      <figure v-for="(card, index) in status" :key="index">
        <img :src="card.picture.thumbnail" :alt="card.title" />
        <picture class="quant">
          {{ quant }}
        </picture>
        <figcaption class="name">{{ card.name.first }}</figcaption>
      </figure>
    </ul>
  </div>
</template>

<script>
import More from '~/assets/icons/More.vue'

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
      background: $Neutral100;
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

    position: relative;

    > img,
    .img {
      width: 60px;
      height: 60px;

      position: relative;

      border-radius: 40px 40px 40px 20px;

      box-shadow: 0 0 1px 2px rgb(0, 0, 0, 0.1);
    }

    .img {
      background: $Primary20;

      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        width: 30px;
        height: 30px;
      }
    }

    .quant {
      width: 25px;
      height: 25px !important;
      position: absolute;
      background: $Primary20;
      color: $Neutral100;
      bottom: 26px;
      left: 3px;
      border-radius: 0px 10px 0px 10px;

      display: flex;
      align-items: center;
      justify-content: center;

      @include bold-text($Neutral100);
      font-family: 'Montserrat';
      font-size: 10px;
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
