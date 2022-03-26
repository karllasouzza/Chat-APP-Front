<template>
  <div :class="edit ? 'img edit' : 'img'">
    <img :src="thumbnail" alt="" />

    <input
      id="formFileLg"
      ref="fileInput"
      class="form-control form-control-lg"
      type="file"
      @input="selectImgFile"
    />
    <div v-if="edit" class="addImage">
      <IconAddImage @click.native="chooseFile()" />
    </div>
  </div>
</template>

<script>
import IconAddImage from '~/components/Svgs/IconAddImage.vue'

export default {
  name: 'ProfileImage',
  components: { IconAddImage },
  props: {
    edit: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      thumbnail: null,
    }
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click()
    },

    selectImgFile() {
      const fileInput = this.$refs.fileInput
      const imgFile = fileInput.files

      if (imgFile && imgFile[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.thumbnail = e.target.result
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
    },
  },
}
</script>

<style lang="scss" scoped>


#formFileLg {
  display: none;
}
</style>
