<template>
  <form
    v-if="loaded"
    novalidate
    autocomplete="off"
    class="container"
    @submit.prevent
  >
    <section
      :class="edit ? 'ContainerImage ContainerImageEdit' : 'ContainerImage'"
    >
      <CutImg :user-img="thumbnail" :edit="edit" :profile="withThumbnail" />
      <TitleProfile v-if="!edit" :text="user.name" is-label="false" />
    </section>

    <section v-if="edit" :class="edit ? 'editData first' : '.section'">
      <TitleProfile :text="$t('Profile.name')" is-label="true" />
      <span v-if="!edit">{{ user.email }}</span>

      <input v-else v-model="name" type="text" />
    </section>

    <section :class="edit ? 'editData middle' : 'section'">
      <TitleProfile :text="$t('Profile.bio')" is-label="true" />
      <span v-if="!edit">{{ user.bio ? user.bio : '-----' }}</span>
      <textarea-autosize v-else ref="bio" v-model="bio" />
    </section>

    <div>
      <button v-if="edit" class="btn" @click="simpleUpdateUser()">
        <IconOk />
      </button>
      <BtnPrimary
        v-else
        :text="$t('Profile.edit')"
        type="button"
        class="btnEdit"
        @click.native="activeEdit()"
      />
      <button v-if="edit" class="btn" @click="offEdit()">
        <IconClose />
      </button>
      <BtnPrimary
        v-else
        :text="$t('Profile.delete')"
        type="button"
        class="btnDelete"
      />
      <BtnPrimary
        v-if="!edit"
        :text="$t('Profile.logout')"
        type="button"
        class="btnLogout"
      />
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'
import { decode } from 'base64-arraybuffer'

import TitleProfile from '../components/Profile/Title.vue'
import IconOk from '../components/Svgs/IconOk.vue'
import IconClose from '~/components/Svgs/IconClose.vue'
import BtnPrimary from '~/components/BtnPrimary.vue'
import CutImg from '~/components/Profile/CutImg.vue'

export default {
  name: 'LoginPage',

  components: {
    TitleProfile,
    IconClose,
    BtnPrimary,
    IconOk,
    CutImg,
  },

  layout: 'WithNav',

  data() {
    return {
      loaded: false,

      edit: false,
      user: {},

      bio: '',
      email: '',
      name: '',
      password: '',

      withThumbnail: false,
      thumbnail: '',
    }
  },

  computed: {
    ...mapState({
      userID: (state) => state.User.userID,
      img: (state) => state.Cut.image,
    }),
  },

  async created() {
    await this.getUser()
    await this.getSignedUrlProfileImage()
  },

  methods: {
    async getUser() {
      const { data: user } = await this.$supabase
        .from('users')
        .select('*')
        .filter('_id', 'eq', this.userID)

      if (user) {
        this.user = user[0]
        this.loaded = true
      }
    },

    async simpleUpdateUser() {
      if (this.user.name !== this.name || this.user.bio !== this.bio) {
        this.updateUserNameAndBio()
      }

      if (!this.withThumbnail) {
        await this.insertProfileImage(this.img)
      } else {
        await this.updateProfileImage(this.img)
      }
    },

    async updateUserNameAndBio() {
      try {
        const { data: user, error } = await this.$supabase
          .from('users')
          .update({
            name: this.name === this.user.name ? this.user.name : this.name,
            bio: this.bio === this.user.bio ? this.user.bio : this.bio,
          })
          .eq('_id', this.userID)

        if (!user) throw new Error(error)
        if (error) throw new Error(error)

        this.user = user[0]
      } catch (error) {
        console.log('updateUserNameAndBio', error)
      }
    },

    // --
    async getSignedUrlProfileImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('public')
          .list('userProfile', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
            search: this.userID,
          })

        if (error) throw new Error(error.message)
        if (data.length === 0 || !data) this.setFirstPublicProfileImage()
        if (data.length > 1) throw new Error('multiple images')
        console.log(data)

        const { data: dataSigned, errorSigned } = await this.$supabase.storage
          .from('public')
          .createSignedUrl(`/userProfile/${data[0].name}`, 60)

        if (!dataSigned) throw new Error('not signed url')
        if (errorSigned) throw new Error('not signed url')

        // const img = await this.getProfileImage()

        this.thumbnail = dataSigned.signedURL

        this.withThumbnail = true
      } catch (error) {
        console.log(error)
      }
    },

    async setFirstPublicProfileImage() {
      try {
        const { data, error: listError } = await this.$supabase.storage
          .from('public')
          .list('avatars', {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          })

        if (!data) throw new Error('not data')
        if (listError) throw new Error(listError.message)

        const index = Math.floor(Math.random() * data.length)

        const { publicURL, error } = await this.$supabase.storage
          .from('public')
          .getPublicUrl(`avatars/${data[index].name}`)

        if (!publicURL) throw new Error(error)
        if (error) throw new Error(error)

        const image = await this.getProfileImage(publicURL)

        await this.insertProfileImage(image)

        this.getSignedUrlProfileImage()
      } catch (error) {
        console.log('setFirstPublicProfileImage', error)
      }
    },

    async getProfileImage(url) {
      const response = await this.$axios.get(url, {
        responseType: 'arraybuffer',
      })
      const buffer64 = Buffer.from(response.data, 'binary').toString('base64')

      return buffer64
    },

    async insertProfileImage(image) {
      try {
        const { data, error } = await this.$supabase.storage
          .from('public')
          .upload(`/userProfile/${this.userID}.png`, decode(image), {
            contentType: 'image/png',
          })

        if (!data) throw new Error(error.message)
        if (error) throw new Error(error.message)

        this.getSignedUrlProfileImage()
      } catch (error) {
        console.log('insertProfileImage', error)
      }
    },

    async updateProfileImage(image) {
      try {
        console.log(image)
        const { data, error } = await this.$supabase.storage
          .from('public')
          .update(`/userProfile/${this.userID}.png`, decode(image), {
            contentType: 'image/png',
          })
        console.log(data)
        if (!data) throw new Error(error)
        if (error) throw new Error(error)

        this.getSignedUrlProfileImage()
      } catch (error) {
        console.log('updateProfileImage', error)
      }
    },

    async deleteProfileImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('public')
          .remove([`/userProfile/${this.userID}.png`])

        if (!data) throw new Error(error)
        if (error) throw new Error(error)
      } catch (error) {}
    },

    activeEdit() {
      this.bio = this.user.bio
      this.name = this.user.name

      this.edit = true
    },

    offEdit() {
      this.bio = ''
      this.name = ''

      this.edit = false
    },
  },
}
</script>

<style lang="scss" scoped>
#APP {
  height: 100vh !important;
}
.container {
  width: 100%;
  height: 100%;

  grid-row: 2/3;
  grid-column: 3/4;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 20px 0;
  .ContainerImage {
    width: 100%;
    height: 200px;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    grid-row: 1/2;
    grid-column: 1/3;
  }

  .ContainerImageEdit {
    height: 120px;
  }

  .section {
    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;

    span {
      font-family: 'Montserrat';
      font-weight: 600;
      // font-size: 28px;

      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .editData {
    position: relative;

    display: flex;
    align-items: center;

    textarea,
    input {
      width: 100%;
      height: 100%;

      resize: none;
      border: none;
      background: none;

      z-index: 2;

      outline: 0;
    }

    textarea {
      padding: 5% 4%;
      padding: 8px;

      min-height: 15px;
    }

    input {
      min-height: 50px;
      padding: 8px;
    }

    p {
      width: fit-content;
      padding: 3px 5px;

      background: $white;

      position: absolute;
      top: -12px;
      left: 30px;
      z-index: 1;
    }

    &::after {
      content: '';

      width: 100%;
      height: 100%;

      display: flex;

      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;

      border: 2px solid $PrimaryColor;
      border-radius: 30px 30px 30px 5px;
    }
  }

  .middle {
    &::after,
    textarea,
    input {
      border-radius: 30px;
    }
  }

  .first {
    &::after,
    textarea,
    input {
      border-radius: 30px 30px 30px 5px;
    }
  }

  .last {
    &::after,
    textarea,
    input {
      border-radius: 5px 30px 30px 30px;
    }
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .btn {
      width: 60px;
      height: 45px;

      background: $PrimaryColor;
      border-radius: 15px 15px 15px 2.5px;

      display: flex;
      align-items: center;
      justify-content: center;

      > svg {
        width: 25px;
        height: 25px;
      }

      &:last-child {
        background: none;
        border: $Secondary 2px solid;

        border-radius: 15px 15px 2.5px 15px;
      }
    }
  }

  .btnEdit,
  .btnLogout {
    width: 80px;

    height: 50px;
    border: 2px solid;

    border-radius: 5px 30px 30px 30px;
  }

  .btnDelete {
    width: 100px;
    height: 50px;

    background: $Secondary;
    color: $white;

    border-radius: 30px;
  }

  .btnEdit {
    border-color: $PrimaryColor;
    color: $PrimaryColor;
  }
  .btnLogout {
    border-color: $Secondary;
    color: $Secondary;

    border-radius: 30px 30px 5px 30px;
  }
}
</style>
