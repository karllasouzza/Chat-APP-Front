<template>
  <!-- v-if="load > 4" -->
  <article
    :class="messages.quantMessagesNotView ? ' card NotView' : 'card View'"
  >
    <img
      :src="src"
      :alt="'Foto de perfil do usuário:' + user.name + '. Image'"
    />
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
      src: '',
      user: {},
      messages: {},
      load: 0,
      userID: this.$supabase.auth.user(),
    }
  },
  async created() {
    await this.getUser(this.item.user_to, this.item.user_from)
    await this.getImage(this.item.user_to, this.item.user_from)
    await this.getMessagesNotView(this.user._id, this.item._id)
  },

  methods: {
    async getImage(toId, fromId) {
      try {
        const { data: dataSigned, errorSigned } = await this.$supabase.storage
          .from('public')
          .createSignedUrl(
            `/userProfile/${toId === this.userID.id ? fromId : toId}.png`,
            60
          )

        if (!dataSigned) throw new Error('no data')
        if (errorSigned) throw new Error(errorSigned)

        this.src = dataSigned.signedURL
      } catch (e) {
        console.log(e)
      }
    },

    async getMessagesNotView(id, chatId) {
      const { data: res } = await this.$supabase
        .from('messages')
        .select('*')
        .eq('user_from', id)
        .eq('chat_id', chatId)
        .or('status.eq.Delivered,status.eq.Send')

        .order('created_at', { ascending: false })
      console.log(res)
      if (res.length > 0) this.messages = ModelChats(this.userID.id, res)
    },

    async getUser(toId, fromId) {
      const { data: res } = await this.$supabase
        .from('users')
        .select('*')
        .eq('_id', toId === this.userID.id ? fromId : toId)

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
      } else if(seconds > 0) {
        return `${this.$t('Dates.now')}`
      }else {
        return ``

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
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > img {
    width: 60px;
    height: 60px;

    border-radius: 50%;
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
      @include bold-text($black);
      text-transform: none;
      font-size: 12px;

      z-index: 1;
    }

    > strong {
      @include bold-text($black);
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
}

.NotView {
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
      color: $PrimaryColor;
    }

    > strong {
      color: $PrimaryColor;
    }
  }
}

.View {
  &::before {
    background: $PrimaryColor;
  }
}
</style>
