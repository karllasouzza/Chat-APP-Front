<template>
  <div class="container">
    <BlurPopup
      v-if="login || account"
      @click.native="login ? (login = false) : (account = false)"
    />

    <Logo />
    <aside>
      <h1>{{ $t('Login.label') }}</h1>
      <span>
        {{ $t('Login.text') }}
      </span>
    </aside>
    <div>
      <BtnPrimary
        :type="$t('Login.buttons[0].type')"
        :text="$t('Login.buttons[0].text')"
        @click.native="login = true"
      />

      <BtnPrimary
        :type="$t('Login.buttons[1].type')"
        :text="$t('Login.buttons[1].text')"
        @click.native="account = true"
      />
    </div>

    <transition name="TranslateY">
      <form v-if="login" class="login" novalidate>
        <div>
          <span>
            <p>{{ $t('Login.popUps[0].Greeting') }}</p>
            <strong>{{ $t('Login.popUps[0].Label') }}</strong>
          </span>
          <IconClose :title="$t('Icon.close')" @click.native="login = false" />
        </div>
        <InputForms
          ref="R_email_login"
          v-model="email_login"
          type="email"
          :placeholder="$t('Login.popUps[0].Placeholder_Email')"
          :title="$t('Login.popUps[0].Title_Email')"
        />

        <InputForms
          ref="R_Password_login"
          v-model="password_login"
          type="password"
          :placeholder="$t('Login.popUps[0].Placeholder_Password')"
          :title="$t('Login.popUps[0].Title_Password')"
        />
        <BtnPrimary
          type="button"
          text="Login"
          :title="$t('Login.popUps[0].Title_Button_Login')"
          @click.native="MakeLogin()"
        />
      </form>
    </transition>

    <transition name="TranslateY">
      <form v-if="account" class="account" novalidate>
        <div>
          <span>
            <p>{{ $t('Login.popUps[1].Greeting') }}</p>
            <strong>{{ $t('Login.popUps[1].Label') }}</strong>
          </span>
          <IconClose
            :title="$t('Icon.close')"
            @click.native="account = false"
          />
        </div>
        <InputForms
          ref="name_account"
          v-model="name_account"
          type="text"
          :placeholder="$t('Login.popUps[1].Placeholder_Name')"
          :title="$t('Login.popUps[1].Title_Name')"
        />
        <InputForms
          ref="R_email_account"
          v-model="email_account"
          type="email"
          :placeholder="$t('Login.popUps[1].Placeholder_Email')"
          :title="$t('Login.popUps[1].Title_Email')"
        />
        <InputForms
          ref="R_password_account"
          v-model="password_account"
          type="password"
          :placeholder="$t('Login.popUps[1].Placeholder_Password')"
          :title="$t('Login.popUps[1].Title_Password')"
        />
        <InputForms
          ref="R_confirm_password"
          v-model="confirm_password"
          :placeholder="$t('Login.popUps[1].Placeholder_ConfirmPassword')"
          :title="$t('Login.popUps[1].Title_ConfirmPassword')"
          type="password"
        />

        <BtnPrimary
          type="button"
          :title="$t('Login.popUps[1].Title_Button')"
          :text="$t('Login.popUps[1].Text_Button')"
          @click.native="MakeAccount()"
        />
      </form>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import IconClose from '~/components/Svgs/IconClose.vue'

export default {
  name: 'LoginPage',

  components: { IconClose },

  layout: 'DefaultLayout',

  data() {
    return {
      login: false,
      account: false,

      /* V values */
      email_login: '',
      password_login: '',

      name_account: '',
      email_account: '',
      confirm_password: '',
      password_account: '',
    }
  },

  methods: {
    ...mapActions({
      SetUser: 'User/SetUser',
      toastError: 'Notification/ToastError',
      toastSuccess: 'Notification/ToastSuccess',
    }),

    async MakeLogin() {
      if (
        !this.validPassword(this.password_login) |
        !this.validEmail(this.email_login)
      )
        return

      await this.$axios
        .$post(
          '/dev/login/users',
          {
            email: this.email_login,
            password: this.password_login,
          },
          { progress: false }
        )
        .then((response) => {
          this.SetUser({
            User: response.data.response,
          })
          this.toastSuccess(this.$t('Login.Success.Login'))
          return this.$router.push('/chat')
        })
        .catch(() => {
          this.toastError(this.$t('Login.Error.Login'))
        })
    },

    async MakeAccount() {
      try {
        if (
          !this.validPasswordAccount(
            this.password_account,
            this.confirm_password
          ) |
          !this.validEmailAccount(this.email_account) |
          !this.validName(this.name_account)
        )
          return

        await this.$axios
          .$post('/dev/users/', {
            name: this.name_account,
            email: this.email_account,
            password: this.confirm_password,
          })
          .then((response) => {
            this.toastSuccess(this.$t('Login.Success.Account'))
            this.SetUser({
              User: response.data.response,
            })
            return this.$router.push('/chat')
          })

          .catch(() => {
            this.toastError(this.$t('Login.Error.Account'))
          })
      } catch (e) {
        this.toastError(this.$t('Login.Error.Error_Request'))
      }
    },

    validName(name) {
      const regex = /^([a-z]{2,}([\s-][a-z]{2,})+)$/gi

      if (!name) {
        this.$refs.name_account.focus()
        this.toastError(this.$t('Login.Error.Null_name'))

        return false
      }
      if (!regex.test(name)) {
        this.$refs.name_account.focus()

        this.toastError(this.$t('Login.Error.Invalid_name'))
        return false
      }

      return true
    },

    async validEmailAccount(email) {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

      if (!email) {
        this.$refs.R_email_account.focus()
        this.toastError(this.$t('Login.Error.Null_email'))
        return false
      } else if (!regex.test(email)) {
        this.$refs.R_email_account.focus()

        this.toastError(this.$t('Login.Error.Invalid_email'))
        return false
      }
      await this.$axios
        .$get(`/dev/users/search/${email}`)
        .then((response) => {
          this.$refs.R_email_account.focus()

          this.toastError(this.$t('Login.Error.Duplicate_email'))
          return false
        })
        .catch(() => {
          return true
        })
    },

    async validEmail(email) {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

      if (!email) {
        this.$refs.R_email_login.focus()
        this.toastError(this.$t('Login.Error.Null_email'))
        return false
      } else if (!regex.test(email)) {
        this.$refs.R_email_login.focus()

        this.toastError(this.$t('Login.Error.Invalid_email'))
        return false
      }

      await this.$axios
        .$get(`/dev/users/search/${email}`)
        .then((response) => {
          return true
        })
        .catch(() => {
          this.$refs.R_email_login.focus()

          this.toastError(this.$t('Login.Error.Unregistered_email'))
          return false
        })
    },

    validPasswordAccount(password, confirmPassword) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

      if (!password) {
        this.$refs.R_password_account.focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      } else if (!confirmPassword) {
        this.$refs.R_confirm_password.focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      } else if (!regex.test(password)) {
        this.$refs.R_password_account.focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      } else if (password !== confirmPassword) {
        this.$refs.R_confirm_password.focus()

        this.toastError(this.$t('Login.Error.Null_password_confirmation'))
        return false
      }

      return true
    },

    validPassword(password) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

      if (!password) {
        this.$refs.R_Password_login.focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      } else if (!regex.test(password)) {
        this.$refs.R_Password_login.focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: $white;

  > div {
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
      width: 80%;
      height: 40px;

      background: $PrimaryColor;
      transition: 0.7s ease-in-out;

      @include bold-text($white);
      @include ButtonHoverToTransparent($PrimaryColor);

      &:last-child {
        border: solid 1px $Secondary;
        background: transparent;
        -webkit-text-stroke: 1px $Secondary;
        transition: 0.7s ease-in-out;

        @include ButtonHoverToSolidColor($Secondary, $white);
      }
    }
  }
  > svg {
    width: 130px;
    height: 130px;
  }
  > aside {
    width: 100%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h1 {
      font-size: 2rem;
      font-weight: bold;
      font-family: 'Raleway';
      color: $Secondary;
    }
    span {
      width: 90%;
      height: fit-content;

      display: flex;
      align-items: center;
      justify-content: center;

      color: $black;
      text-align: center;
      font-family: 'Montserrat', 'Helvetica';
      line-height: 20px;
      font-size: 1rem;
    }
  }

  > form {
    height: 300px;

    background-color: $white;
    border-radius: 20px 20px 0 0;

    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;

    > div {
      width: 88%;
      height: 55px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;

      > span {
        height: 50px;

        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
        flex-direction: column;
        > strong {
          @include bold-text($PrimaryColor);
        }
      }
    }

    > button {
      width: 88%;
      height: 40px;
      background: $PrimaryColor;
      transition: 0.7s ease-in-out;
      @include bold-text(#fff);

      &:hover {
        background-color: transparent;
        -webkit-text-stroke: 1px $PrimaryColor;
        border: 1px solid $PrimaryColor;
      }
    }
  }

  > form.account {
    height: 400px;
  }
}
</style>
