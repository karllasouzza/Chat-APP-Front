<template>
  <main>
    <section>
      <IlustrationEmail />
      <div>
        <h1>Verifique seu e-mail</h1>
        <p>{{ email[1] }}</p>
      </div>
    </section>

    <BtnPrimary
      text="Login"
      type="button"
      @click.native="$router.push('/login')"
    />
  </main>
</template>

<script>
import IlustrationEmail from '~/components/Svgs/IlustrationEmail.vue'
import BtnPrimary from '~/components/BtnPrimary.vue'

export default {
  name: 'ConfirmAccount',
  components: { IlustrationEmail, BtnPrimary },
  data() {
    return {
      email: this.$route.fullPath.replace('%40', '@').split('?'),
    }
  },
}
</script>

<style lang="scss" scoped>
main {
  width: 100%;
  height: 100%;
  padding: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  section {
    width: 100%;
    height: 68%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    svg {
      width: 130px;
    }

    div {
      height: 80px;

      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      h1 {
        @include bold-text($Secondary);
      }
      p {
        font-weight: bold;
      }
    }
  }

  button {
    width: 90%;
    height: 45px;
    border-radius: 20px 20px 20px 5px;

    background: $PrimaryColor;

    @include bold-text($white);
    text-transform: none;
  }
}
</style>
