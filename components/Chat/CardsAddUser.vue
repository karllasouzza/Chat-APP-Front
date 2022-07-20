<template>
  <article class="card">
    <figure v-if="!load" class="load_img"></figure>
    <img
      v-else
      :src="src"
      :alt="'Foto de perfil do usuário:' + user.name + '. Image'"
    />

    <span class="content">
      <strong :class="load ? '' : 'load_text'">{{ user.name }}</strong>
      <p :class="load ? '' : 'load_text'">{{ user.bio }}</p>
    </span>
  </article>
</template>

<script>
export default {
  name: 'IndexCards',
  props: {
    user: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      load: false,
      src: '',
      userID: this.$supabase.auth.user(),
    }
  },
  async created() {
    await this.getImage(this.user._id)
    this.load = true
  },
  methods: {
    async getImage(id) {
      try {
        const { data: dataSigned, errorSigned } = await this.$supabase.storage
          .from('public')
          .createSignedUrl(`/userProfile/${id}.png`, 60)
        if (!dataSigned) throw new Error('no data')
        if (errorSigned) throw new Error(errorSigned)
        this.src = dataSigned.signedURL
      } catch (e) {}
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

  background: $Tertiary90;
  @include Elevation_1;
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
  }

  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 5px;
  }
}

.load_text {
  background-color: $Primary10;
  color: transparent !important;
  border-radius: 16px;
}
</style>
