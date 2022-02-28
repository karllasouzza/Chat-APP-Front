<template>
  <div id="container">
    <UserGreet />
    <UsersStatus />

    <ul class="chats">
      <Cards
        v-for="(item, index) in data"
        :key="index"
        :user="item.user"
        :messages="item.messages"
        @click.native="localePath('/chat/' + item.user.id)"
      />
    </ul>
  </div>
</template>

<script>
import UsersStatus from '~/components/Status/UsersStatus.vue'
import Cards from '~/components/Chat/Cards.vue'
export default {
  name: 'HomePage',
  components: { UsersStatus, Cards },
  layout: 'WithNav',

  data() {
    return {
      data: [
        {
          user: {
            id: 1,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: ' há 2 m',
            quantMessagesNotView: 2,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
        {
          user: {
            id: 2,
            name: 'karlla souzza',
            img: 'https://github.com/karllasouzza.png',
          },
          messages: {
            lastMessage: 'ola mundo',
            momentSend: 'ontem',
            quantMessagesNotView: 0,
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 3/4;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 45px 5px 90px 40px 1fr;
}

.chats {
  grid-row: 5/5;

  overflow-y: scroll;
}
</style>
