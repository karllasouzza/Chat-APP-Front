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
      <CutImg :user-img="thumbnail" :edit="edit" />
      <TitleProfile v-if="!edit" :text="user.name" is-label="false" />
    </section>

    <section v-if="edit" :class="edit ? 'editData first' : ''">
      <TitleProfile :text="$t('Profile.name')" is-label="true" />
      <span v-if="!edit">{{ user.email }}</span>

      <input v-else v-model="name" type="text" />
    </section>

    <section :class="edit ? 'editData middle' : ''">
      <TitleProfile :text="$t('Profile.bio')" is-label="true" />
      <span v-if="!edit">{{ user.bio ? user.bio : '-----' }}</span>
      <textarea v-else v-model="bio"></textarea>
    </section>

    <section :class="edit ? 'editData middle' : ''">
      <TitleProfile :text="$t('Profile.email')" is-label="true" />
      <span v-if="!edit">{{ user.email }}</span>
      <input v-else v-model="email" type="email" />
    </section>

    <section v-if="edit" :class="edit ? 'editData last' : ''">
      <TitleProfile :text="$t('Profile.newPassword')" is-label="true" />
      <span v-if="!edit">{{ user.email }}</span>
      <input
        v-else
        v-model="password"
        autocomplete="new-password"
        type="password"
      />
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
    async simpleUpdateUser() {
      if (this.user.name !== this.name || this.user.bio !== this.bio) {
        this.updateUserNameAndBio()
      }

      if (!this.withThumbnail) {
        await this.insertProfileImage()
      } else {
        await this.updateProfileImage()
      }
    },

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

    async getSignedUrlProfileImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('profile-images')
          .list(`${this.userID}/profile`, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          })

        if (!data) throw new Error(error)
        if (error) throw new Error(error)

        const img = data.filter((image) => {
          return image.name.includes('profile')
        })

        if (img.length !== 1) throw new Error('multiple images')

        this.withThumbnail = true

        const { dataSigned, errorSigned } = await this.$supabase.storage
          .from('public')
          .createSignedUrl(`${this.userID}/profile/${img[0].name}`, 60)

        if (!dataSigned) throw new Error('not signed url')
        if (errorSigned) throw new Error('not signed url')

        this.thumbnail = await this.getProfileImage(dataSigned.signedURL)
      } catch (error) {}
    },

    async getProfileImage(url) {
      return await this.$axios.get(url).then((response) => {
        console.log(response)
        return response.data
      })
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
      } catch (error) {}
    },

    async insertProfileImage() {
      const { data, error } = await this.$supabase.storage
        .from('profile-images')
        .upload(`${this.userID}/profile/profile.png`, this.img)

      if (!data) throw new Error(error)
      if (error) throw new Error(error)
    },

    async updateProfileImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('profile-images')
          .update(`${this.userID}/profile/profile.png`, this.img, {
            cacheControl: '300',
          })

        if (!data) throw new Error(error)
        if (error) throw new Error(error)

        this.thumbnail = this.img

        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },

    async deleteProfileImage() {
      try {
        const { data, error } = await this.$supabase.storage
          .from('profile-images')
          .remove([`${this.userID}/profile/profile.png`])

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
  justify-content: space-between;

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

    p {
      margin-bottom: 8px;

      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      strong {
        @include bold-text($PrimaryColor);
        text-transform: none;

        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }
    > span {
      font-family: 'Montserrat';
      font-weight: 600;

      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
  .bio {
    height: fit-content;

    grid-row: 2/3;
    grid-column: 1/3;

    // margin-top: 15px;
    // margin-bottom: 15px;
  }
  .email {
    grid-row: 4/5;
    grid-column: 1/3;
  }

  .editData {
    position: relative;

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
      padding: 15px 5px 5px 10px;
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
