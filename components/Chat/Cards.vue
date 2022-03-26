<template>
  <!-- v-if="load > 4" -->
  <article
    :class="messages.quantMessagesNotView ? ' card NotView' : 'card View'"
  >
    <!-- <img
      :src="src"
      :alt="'Foto de perfil do usuário:' + user.name + '. Image'"
    /> -->
    <span class="content">
      <strong>{{ user.name }}</strong>
      <p>{{ messages.lastMessage }}</p>
    </span>
    <span class="datetime">
      <strong>{{
        messages.quantMessagesNotView ? messages.quantMessagesNotView : ''
      }}</strong>
      <p>{{ countDates(messages.momentSend) }}</p>
    </span>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import ModelChats from '~/static/Models/ModelChats'

export default {
  name: 'IndexCards',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },

  data() {
    return {
      // src: {},
      user: {},
      messages: {},
      load: 0,
    }
  },
  computed: {
    ...mapState({
      userID: (state) => state.User.userID,
    }),
  },
  async created() {
    await this.getUser(this.item.user_to, this.item.user_from)
    // await this.getImage(this.item.user_to, this.item.user_from)
    await this.getMessagesNotView(this.userID, this.item._id)
  },

  methods: {
    // async getImage(toId, fromId) {
    //   await this.$supabase
    //     .from('users')
    //     .select('image')
    //     .filter('_id', 'eq', toId === this.userID ? fromId : toId)
    //     .then((res) => {
    //       this.src = res[0].image
    //       console.log(res[0].image)
    //     })
    // },

    async getMessagesNotView(id, chatId) {
      const { data: res } = await this.$supabase
        .from('messages')
        .select('*')
        .or(`user_to.eq.${id},user_from.eq.${id},and(chat_id.eq.${chatId})`)
        .order('created_at', { ascending: false })
      this.messages = ModelChats(this.userID, res)
    },

    async getUser(toId, fromId) {
      const { data: res } = await this.$supabase
        .from('users')
        .select('*')
        .eq('_id', toId === this.userID ? fromId : toId)

      console.log(res)
      this.user = res[0]
    },

    countDates(seconds) {
      // Seconds
      if (seconds >= 60) {
        // Hours
        if (seconds >= 3600) {
          // DAY
          if (seconds > 86400) {
            const days = seconds / 86400
            return `${this.$t('Dates.ago')} ${days.toFixed(0)}d`
          } else if (seconds === 86400) {
            return `${this.$t('Dates.yesterday')}`
          } else {
            const hours = seconds / 3600
            return `${this.$t('Dates.ago')} ${hours.toFixed(0)}h`
          }
        } else {
          const minutes = seconds / 60
          return `${this.$t('Dates.ago')} ${minutes.toFixed(0)}m`
        }
      } else {
        return `${this.$t('Dates.now')}`
      }
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
    align-items: flex-start;
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
