<template>
  <div class="container">
    <BlurPopup
      v-if="login || account"
      @click.native="login ? closeLogin() : closeAccount()"
    />

    <Logo :title="$t('Title_Icon')" />
    <aside>
      <h1>{{ $t('Login.label') }}</h1>
      <span>
        {{ $t('Login.text') }}
      </span>
    </aside>
    <div>
      <BtnPrimary
        :type="$t('Login.buttons[1].type')"
        :text="$t('Login.buttons[1].text')"
        @click.native="account = true"
      />
      <BtnPrimary
        :type="$t('Login.buttons[0].type')"
        :text="$t('Login.buttons[0].text')"
        @click.native="login = true"
      />
    </div>

    <transition name="TranslateY">
      <form v-if="login" class="login" novalidate>
        <div>
          <span>
            <p>{{ $t('Login.popUps[0].Greeting') }}</p>
            <strong>{{ $t('Login.popUps[0].Label') }}</strong>
          </span>
          <IconClose :title="$t('Icons.close')" @click.native="closeLogin()" />
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
            :title="$t('Icons.close')"
            @click.native="closeAccount()"
          />
        </div>
        <InputForms
          v-if="accountPoint === 1"
          ref="R_password_account"
          v-model="password_account"
          type="password"
          :placeholder="$t('Login.popUps[1].Placeholder_Password')"
          :title="$t('Login.popUps[1].Title_Password')"
          @keyup.enter="MakeAccount"
        />
        <InputForms
          v-else
          ref="name_account"
          v-model="name_account"
          type="text"
          :placeholder="$t('Login.popUps[1].Placeholder_Name')"
          :title="$t('Login.popUps[1].Title_Name')"
          @keyup.enter="MakeAccount"
        />

        <InputForms
          v-if="accountPoint === 1"
          ref="R_confirm_password"
          v-model="confirm_password"
          :placeholder="$t('Login.popUps[1].Placeholder_ConfirmPassword')"
          :title="$t('Login.popUps[1].Title_ConfirmPassword')"
          type="password"
          @keyup.enter="MakeAccount"
        />
        <InputForms
          v-else
          ref="R_email_account"
          v-model="email_account"
          type="email"
          :placeholder="$t('Login.popUps[1].Placeholder_Email')"
          :title="$t('Login.popUps[1].Title_Email')"
          @keyup.enter="MakeAccount"
        />

        <BtnPrimary
          v-if="accountPoint === 0"
          type="button"
          :title="$t('Login.popUps[1].Text_Button_first_point')"
          :text="$t('Login.popUps[1].Text_Button_first_point')"
          @click.native="accountPoint = 1"
        />
        <div v-else>
          <BtnPrimary
            class="returnBtn"
            type="button"
            :title="$t('Login.popUps[1].Text_Button_return_to_first_point')"
            :text="$t('Login.popUps[1].Text_Button_return_to_first_point')"
            @click.native="accountPoint = 0"
          />
          <BtnPrimary
            type="button"
            :title="$t('Login.popUps[1].Text_Button_last_point')"
            :text="$t('Login.popUps[1].Text_Button_last_point')"
            @click.native="MakeAccount"
          />
        </div>
      </form>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import IconClose from '~/components/Svgs/IconClose.vue'
import Logo from '~/components/Svgs/Logo.vue'

export default {
  name: 'LoginPage',

  components: { IconClose, Logo },

  layout: 'DefaultLayout',

  data() {
    return {
      login: false,
      account: false,
      accountPoint: 0,

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

    closeLogin() {
      this.email_login = ''
      this.password_login = ''
      this.login = false
    },

    closeAccount() {
      this.name_account = ''
      this.email_account = ''
      this.confirm_password = ''
      this.password_account = ''
      this.account = false
      this.accountPoint = 0
    },

    async MakeLogin() {
      if (
        !this.validPassword(this.password_login) |
        !this.validEmail(this.email_login)
      )
        return

      try {
        const { session, authError } = await this.$supabase.auth.signIn({
          email: this.email_login,
          password: this.password_login,
        })
        if (authError) throw new Error(authError.message)
        if (!session) throw new Error('error in singIn')

        const { data: user } = await this.$supabase
          .from('users')
          .select('*')
          .filter('_id', 'eq', session.user.id)

        if (!user) throw new Error('not auth')

        this.SetUser({
          User: user[0]._id,
        })

        this.toastSuccess(this.$t('Login.success.login'))
        return this.$router.push('/HomePage')
      } catch (error) {
        if (error.message === 'Email not confirmed') {
          this.$router.push(`/confirm?${this.email_login}`)
        } else {
          this.toastError(this.$t('Login.Error.Login'))
        }
      }
    },

    async MakeAccount() {
      if (
        !this.validPasswordAccount(
          this.password_account,
          this.confirm_password
        ) |
        !this.validEmailAccount(this.email_account) |
        !this.validName(this.name_account)
      )
        return

      try {
        const { user, authError } = await this.$supabase.auth.signUp({
          email: this.email_account,
          password: this.confirm_password,
        })

        if (!user) throw new Error(authError.message)

        const { data, error } = await this.$supabase.from('users').insert({
          _id: user.id,
          name: this.name_account,
          bio: null,
          created_at: user.created_at,
        })

        if (error) throw new Error(authError.message)
        if (!data) throw new Error('Error in Insert')

        if (user.aud === 'authenticated') {
          this.toastSuccess(this.$t('Login.success.create_account'))
          return this.$router.push('/confirm')
        } else {
          this.toastError(this.$t('Login.Error.Account'))
        }
      } catch (error) {
        this.toastError(this.$t('Login.Error.Account'))
      }
    },

    validName(name) {
      const regex = /^([a-z]{2,}([\s-][a-z]{2,})+)$/gi

      if (!name) {
        this.$refs.name_account.$el.children[0].focus()
        this.toastError(this.$t('Login.Error.Null_name'))

        return false
      }
      if (!regex.test(name)) {
        this.$refs.name_account.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Invalid_name'))
        return false
      }

      return true
    },

    validEmailAccount(email) {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

      if (!email) {
        this.$refs.R_email_account.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Null_email'))
        return false
      } else if (!regex.test(email)) {
        this.$refs.R_email_account.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Invalid_email'))
        return false
      }

      return true
    },

    validEmail(email) {
      if (!email) {
        this.$refs.R_email_login.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Null_email'))
        return false
      }
      return true
    },

    validPasswordAccount(password, confirmPassword) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

      if (!password) {
        this.$refs.R_password_account.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Null_password'))
        return false
      } else if (!regex.test(password)) {
        this.$refs.R_password_account.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Invalid_password'))
        return false
      }
      if (!confirmPassword) {
        this.$refs.R_confirm_password.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Null_password_confirmation'))
        return false
      } else if (password !== confirmPassword) {
        this.$refs.R_confirm_password.$el.children[0].focus()

        this.toastError(this.$t('Login.Error.Not_match_passwords'))
        return false
      }

      return true
    },

    validPassword(password) {
      if (!password) {
        this.$refs.R_Password_login.$el.children[0].focus()

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
      height: 50px;

      background: $PrimaryColor;
      transition: 0.7s ease-in-out;

      border-radius: 10pt;

      color: $white;

      @include bold-text($white);
      @include FilterShadow($PrimaryColor);

      &:last-child {
        background: $Secondary;
        @include FilterShadow($Secondary);
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
      width: 80%;
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

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;

    > div {
      width: 88%;
      height: 40px;

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

        color: $black;

        > strong {
          @include bold-text($black);
          font-size: 1.2rem;
        }
      }
    }

    button {
      width: 88%;
      height: 40px;
      background: $PrimaryColor;
      transition: 0.7s ease-in-out;
      @include bold-text($white);

      border-radius: 10pt;
      @include FilterShadow();
    }

    .returnBtn {
      width: 95px;

      margin-right: 10px;
      font-size: 14px;

      background: $Secondary;
    }
  }

  > form {
    > button,
    input {
      border-radius: 10pt;
    }
  }
}
</style>
