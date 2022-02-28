<template>
  <article
    :class="messages.quantMessagesNotView ? ' card NotView' : 'card View'"
  >
    <img
      :src="user.img"
      :alt="'Foto de perfil do usuario:' + user.name + '. Image'"
    />
    <span class="content">
      <strong>{{ user.name }}</strong>
      <p>{{ messages.lastMessage }}</p>
    </span>
    <span class="datetime">
      <strong>{{
        messages.quantMessagesNotView ? messages.quantMessagesNotView : ''
      }}</strong>
      <p>{{ messages.momentSend }}</p>
    </span>
  </article>
</template>

<script>
export default {
  name: 'IndexCards',
  props: {
    user: {
      type: Object,
      required: true,
    },
    messages: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 70px;
  padding: 0 5px;
  margin: 15px 0;
  border-radius: 40px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    width: 60px;
    height: 60px;

    border-radius: 50% 50% 50% 20%;
    z-index: 1;
  }

  > span.content {
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-around;

    padding: 8px 0;
    margin-right: auto;
    margin-left: 10px;

    z-index: 1;

    > Strong {
      @include bold-text($black);
      text-transform: none;

      font-size: 16px;
    }

    > p {
      @include bold-text($black);
      text-transform: none;
      font-size: 14px;
      font-family: 'Montserrat';

      filter: opacity(0.7);
    }
  }

  > span.datetime {
    width: fit-content;
    height: 100%;
    padding: 8px 0;
    padding: 5px 15px;
    border-radius: 50%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > p {
      @include bold-text($white);
      text-transform: none;
      font-size: 12px;

      z-index: 1;
    }

    > strong {
      @include bold-text($white);
      text-transform: none;
      font-size: 20px;

      z-index: 1;
    }
  }

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 5px;
  }

  &::before {
    content: '';
    width: 100%;
    height: 70px;
    border-radius: 40px 40px 40px 20px;

    margin: 0;

    position: absolute;
    top: 0;
    left: 0;

    background: $PrimaryColor;
    opacity: 0.5;
  }
}

.NotView {
  &::before {
    background: $Secondary;
  }
}

.View {
  &::before {
    background: $PrimaryColor;
  }
}
</style>
