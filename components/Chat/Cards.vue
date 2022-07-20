<template>
  <article
    :class="messages.quantMessagesNotView ? ' card NotView' : 'card View'"
  >
    <figure v-if="!load" class="load_img"></figure>
    <img v-else :src="friendsProfiles[indexFriendProfile].src" />
    <!-- :alt="
        'Foto de perfil do usuário:' +
        friendsProfiles[indexFriendProfile].name +
        '. Image'
      " -->

    <span v-if="load" class="content">
      <strong :class="load ? '' : 'load_text'">{{
        friendsProfiles[indexFriendProfile].name
      }}</strong>
      <p :class="load ? '' : 'load_text'">{{ messages.lastMessage }}</p>
    </span>
    <span v-else class="content">
      <strong class="load_text"></strong>
      <p class="load_text"></p>
    </span>
    <span class="datetime">
      <strong :class="load ? '' : 'load_text'">{{
        messages.quantMessagesNotView ? messages.quantMessagesNotView : ''
      }}</strong>
      <p :class="load ? '' : 'load_text'">
        {{ countDates(messages.momentSend) }}
      </p>
    </span>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModelChats from '~/static/Models/ModelChats'
import { getImageLinkSignedById } from '~/utils/Supabase/images'
import { getMessages } from '~/utils/Supabase/messages'
import { getUser } from '~/utils/Supabase/user'

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
      load: false,

      indexFriendProfile: 0,
      messages: {},

      userID: this.$supabase.auth.user(),
    }
  },
  computed: {
    ...mapState({
      friendsProfiles: (state) => state.FriendsProfiles.profiles,
    }),
  },
  async created() {
    await this.getUser(this.item.user_to, this.item.user_from, this.item._id)
    await this.getMessagesNotView(this.user._id, this.item._id)
  },

  methods: {
    ...mapActions({
      SetNewFriendProfile: 'FriendsProfiles/SetNewFriendProfile',
    }),

    async getMessagesNotView(id, chatId) {
      const { data: res } = await getMessages(chatId)
      if (
        res.filter((msg) => msg.user_from === id && msg.status !== 'View')
          .length > 0
      ) {
        this.messages = ModelChats(this.userID.id, res)
      } else if (res.length > 0) {
        this.messages = ModelChats(this.userID.id, res)
      }
    },

    async getUser(toId, fromId, chatId) {
      this.indexFriendProfile = this.friendsProfiles
        .map((profile) => profile._id)
        .indexOf(toId === this.userID.id ? fromId : toId)

      if (this.indexFriendProfile > -1) {
        this.user = this.friendsProfiles[this.indexFriendProfile]
        this.load = true
      } else if (this.indexFriendProfile === -1) {
        const { data } = await getUser(toId === this.userID.id ? fromId : toId)
        const signedURL = await getImageLinkSignedById(
          toId === this.userID.id ? fromId : toId
        )
        data[0].src = signedURL
        this.SetNewFriendProfile(data[0])
        await this.getUser(toId, fromId, chatId)
      }
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
      } else if (seconds > 0) {
        return `${this.$t('Dates.now')}`
      } else {
        return ``
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  height: 75px;
  padding: 0 10px;
  margin: 15px 0;
  position: relative;
  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 0.8s ease-in-out;

  > img,
  .load_img {
    width: 55px;
    height: 55px;

    border-radius: 50%;
    @include Elevation_1;
  }

  .load_img {
    background: $Primary10;
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

    > Strong {
      @include title_medium;

      color: $Neutral10;
      font-weight: bold;
    }

    > p {
      @include body_medium;

      filter: opacity(0.7);
    }

    .load_text {
      width: 100px;
      height: 25px;

      background-color: $Primary10;
      color: transparent !important;
      border-radius: 16px;
    }
  }

  > span.datetime {
    width: fit-content;
    height: 100%;
    padding: 8px 15px;
    border-radius: 50%;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > p {
      @include body_small;
      font-weight: bold;
    }

    > strong {
      height: 24px;

      display: flex;
      align-items: center;
      justify-content: center;

      @include title_large;
      color: $Neutral10;
      font-weight: bold;
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
  background: $Primary90;
  @include Elevation_1;

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
      color: $Primary20;
    }

    > strong {
      color: $Primary20;
    }
  }
}

.View {
  &::before {
    background: $Primary20;
  }
}
</style>
