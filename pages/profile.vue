<template>
  <form novalidate autocomplete="off" class="container" @submit.prevent>
    <section
      :class="edit ? 'ContainerImage ContainerImageEdit' : 'ContainerImage'"
    >
      <CutImg :user-img="user.src" :edit="edit" :profile="withThumbnail" />
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

import TitleProfile from '../components/Profile/Title.vue'
import IconOk from '../assets/icons/IconOk.vue'
import IconClose from '~/assets/icons/IconClose.vue'
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
      edit: false,

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
      user: (state) => state.User.user,
      img: (state) => state.Cut.image,
    }),
  },

  methods: {
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
  grid-column: 2/3;

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

      background: $Neutral100;

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

      border: 2px solid $Primary20;
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

      background: $Primary20;
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
        border: $Secondary20 2px solid;

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

    background: $Secondary20;
    color: $Neutral100;

    border-radius: 30px;
  }

  .btnEdit {
    border-color: $Primary20;
    color: $Primary20;
  }
  .btnLogout {
    border-color: $Secondary20;
    color: $Secondary20;

    border-radius: 30px 30px 5px 30px;
  }
}
</style>
