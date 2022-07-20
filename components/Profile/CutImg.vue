<template>
  <div>
    <input ref="fileSelect" type="file" @input="croppie" />
    <div :class="edit ? 'img edit' : 'img'">
      <img
        v-if="profile || thumbnail"
        :src="edit ? (!thumbnail ? userImg : thumbnail) : userImg"
        alt=""
      />
      <p
        v-else
        :style="
          edit
            ? !thumbnail
              ? { backgroundImage: `url(${userImg})` }
              : { backgroundImage: `url(${thumbnail})` }
            : { backgroundImage: `url(${userImg})` }
        "
        alt=""
        class="public"
      />

      <div v-if="edit" class="addImage">
        <IconAddImage @click.native="activeCut()" />
      </div>
    </div>

    <div v-if="cut" class="Crop">
      <vue-croppie
        ref="croppieRef"
        :enable-orientation="true"
        :enable-resize="false"
        :viewport="{ width: 300, height: 300, type: 'square' }"
      />
      <footer>
        <button class="change" @click="change()"><IconChange /></button>
        <button class="cute" @click="crop()"><IconOk /></button>
        <button class="exit" @click="close()"><IconClose /></button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

import IconChange from '../../assets/icons/IconChange.vue'
import IconClose from '../../assets/icons/IconClose.vue'
import IconOk from '../../assets/icons/IconOk.vue'
import IconAddImage from '~/assets/icons/IconAddImage.vue'

export default {
  name: 'CutImg',
  components: { IconChange, IconClose, IconOk, IconAddImage },
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
    userImg: {
      type: String,
      required: true,
    },
    profile: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      croppieImage: '',
      cropped: null,
      thumbnail: null,
    }
  },
  computed: {
    ...mapState({
      cut: (state) => state.Cut.cut,
    }),
  },
  methods: {
    ...mapMutations({
      close: 'Cut/clearImage',
      onCut: 'Cut/onCut',
      offCut: 'Cut/offCut',
    }),
    ...mapActions({
      addImage: 'Cut/SetImage',
    }),

    clean() {
      this.close()
      this.cropped = null
      this.croppieImage = null
      this.thumbnail = null
    },

    change() {
      this.$refs.fileSelect.click()
    },

    activeCut() {
      this.onCut()
      this.$refs.fileSelect.click()
    },

    croppie(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$refs.croppieRef.bind({
          url: e.target.result,
        })
      }
      reader.readAsDataURL(files[0])
    },

    crop() {
      const options = {
        type: 'base64',
        size: { width: 500, height: 500 },
        format: 'png',
      }
      this.$refs.croppieRef.result(options, (output) => {
        this.thumbnail = output
        this.croppieImage = output

        const baseCrop = output.split(',')
        this.addImage(baseCrop[1])
        this.offCut()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.Crop {
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;

  background: $Neutral100;

  display: flex;
  flex-direction: column;
  align-items: center;

  footer {
    width: 100%;
    height: 55px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;

    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 1000;

    button {
      width: 90px;
      height: 60px;
      border: 4px solid $Primary20;
      border-radius: 20px;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    button.change {
      width: 80px;

      border-bottom-left-radius: 5px;

      background: $Neutral100;
      border-color: $Neutral100;
    }

    button.cute {
      width: 100px;

      background: $Primary20;
    }

    button.exit {
      width: 80px;

      border-bottom-right-radius: 5px;
      border-color: $Secondary20;
    }
  }
}

.img {
  width: 120px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100px 100px 100px 30px;
  overflow: hidden;

  position: relative;

  img {
    width: 95%;

    border: none;
    border-radius: 100px 100px 100px 30px;
  }
  .addImage {
    width: 50px;
    height: 50px;

    background: $Primary20;

    position: absolute;

    bottom: -1px;
    left: -1px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-top-right-radius: 30px;

    z-index: 3;
  }
}

.edit {
  background-color: $Primary20;
}

input {
  display: none;
}

.public {
  width: 120px;
  height: 120px;
  background-color: $Primary20;
  background-size: 81%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
