<template>
  <div class="container">
    <Notify v-if="NotifyView" />
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

    <div
      v-if="login || account"
      class="blur"
      @click="login ? (login = false) : (account = false)"
    />

    <form v-if="login" class="login" novalidate>
      <div>
        <span>
          <p>{{ $t('Login.popUps[0].Greeting') }}</p>
          <strong>{{ $t('Login.popUps[0].Label') }}</strong>
        </span>
        <svg
          class="close"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="login = false"
        >
          <title>{{ $t('Login.close_title') }}</title>
          <path
            d="M21.9599 11.8954C21.8316 11.7647 21.6789 11.6609 21.5108 11.5901C21.3426 11.5193 21.1622 11.4828 20.9801 11.4828C20.7979 11.4828 20.6175 11.5193 20.4493 11.5901C20.2812 11.6609 20.1285 11.7647 20.0003 11.8954L16.8401 15.1037L13.6799 11.8954C13.42 11.6328 13.0676 11.4852 12.7001 11.4852C12.3326 11.4852 11.9801 11.6328 11.7203 11.8954C11.4604 12.1581 11.3144 12.5143 11.3144 12.8858C11.3144 13.2573 11.4604 13.6135 11.7203 13.8762L14.8943 17.0705L11.7203 20.2648C11.5909 20.3944 11.4882 20.5487 11.4182 20.7187C11.3481 20.8887 11.3121 21.071 11.3121 21.2551C11.3121 21.4393 11.3481 21.6216 11.4182 21.7916C11.4882 21.9615 11.5909 22.1158 11.7203 22.2455C11.8485 22.3762 12.0012 22.48 12.1693 22.5508C12.3375 22.6216 12.5179 22.6581 12.7001 22.6581C12.8822 22.6581 13.0626 22.6216 13.2308 22.5508C13.3989 22.48 13.5516 22.3762 13.6799 22.2455L16.8401 19.0373L20.0003 22.2455C20.1285 22.3762 20.2812 22.48 20.4493 22.5508C20.6175 22.6216 20.7979 22.6581 20.9801 22.6581C21.1622 22.6581 21.3426 22.6216 21.5108 22.5508C21.6789 22.48 21.8316 22.3762 21.9599 22.2455C22.0892 22.1158 22.1919 21.9615 22.2619 21.7916C22.332 21.6216 22.3681 21.4393 22.3681 21.2551C22.3681 21.071 22.332 20.8887 22.2619 20.7187C22.1919 20.5487 22.0892 20.3944 21.9599 20.2648L18.7859 17.0705L21.9599 13.8762C22.0892 13.7465 22.1919 13.5922 22.2619 13.4222C22.332 13.2523 22.3681 13.0699 22.3681 12.8858C22.3681 12.7017 22.332 12.5193 22.2619 12.3494C22.1919 12.1794 22.0892 12.0251 21.9599 11.8954ZM26.5967 7.20862C25.3237 5.87636 23.8009 4.8137 22.1172 4.08266C20.4336 3.35161 18.6227 2.96682 16.7904 2.95072C14.958 2.93463 13.1409 3.28756 11.4449 3.98892C9.74892 4.69028 8.20813 5.72603 6.91241 7.03572C5.61669 8.34542 4.592 9.90284 3.89812 11.6171C3.20425 13.3314 2.85508 15.1681 2.871 17.0203C2.88693 18.8724 3.26762 20.7028 3.99086 22.4046C4.71411 24.1064 5.76542 25.6456 7.08346 26.9323C8.35647 28.2646 9.87922 29.3272 11.5629 30.0583C13.2465 30.7893 15.0574 31.1741 16.8897 31.1902C18.7221 31.2063 20.5393 30.8534 22.2352 30.152C23.9312 29.4507 25.472 28.4149 26.7677 27.1052C28.0634 25.7955 29.0881 24.2381 29.782 22.5238C30.4759 20.8096 30.825 18.9728 30.8091 17.1207C30.7932 15.2685 30.4125 13.4382 29.6893 11.7364C28.966 10.0345 27.9147 8.49536 26.5967 7.20862ZM24.6509 24.9655C22.8459 26.792 20.4702 27.9294 17.9286 28.184C15.387 28.4385 12.8367 27.7944 10.7122 26.3615C8.58771 24.9285 7.02047 22.7954 6.2775 20.3254C5.53453 17.8555 5.66179 15.2015 6.6376 12.8158C7.61341 10.43 9.3774 8.46004 11.629 7.24148C13.8807 6.02293 16.4806 5.63118 18.986 6.13298C21.4913 6.63478 23.747 7.99909 25.3688 9.99345C26.9906 11.9878 27.878 14.4889 27.8801 17.0705C27.885 18.5369 27.6021 19.9897 27.0478 21.3449C26.4935 22.7001 25.6788 23.9307 24.6509 24.9655Z"
            fill="#EA063F"
          />
        </svg>
      </div>
      <div class="input">
        <input
          ref="email_login"
          v-model="email_login"
          type="email"
          :placeholder="$t('Login.popUps[0].Placeholder_Email')"
          :title="$t('Login.popUps[0].Title_Email')"
        />
      </div>
      <div class="input">
        <input
          ref="R_password_login"
          v-model="password_login"
          :type="passwordChange"
          :placeholder="$t('Login.popUps[0].Placeholder_Password')"
          :title="$t('Login.popUps[0].Title_Password')"
        />
        <svg
          v-if="passwordChange == 'password'"
          width="19"
          height="23"
          viewBox="0 0 19 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="passwordChange = 'text'"
        >
          <title>{{ $t('Login.popUps[0].Title_Password_Show_Icon') }}</title>
          <path
            d="M9.59201 12.2817C9.25589 12.2777 8.92664 12.3779 8.64857 12.5688C8.37051 12.7597 8.15697 13.0321 8.03671 13.3494C7.91644 13.6667 7.89523 14.0136 7.97591 14.3434C8.0566 14.6733 8.23532 14.9702 8.48801 15.1942V16.7453C8.48801 17.0413 8.60432 17.3251 8.81136 17.5344C9.0184 17.7437 9.29921 17.8613 9.59201 17.8613C9.88481 17.8613 10.1656 17.7437 10.3727 17.5344C10.5797 17.3251 10.696 17.0413 10.696 16.7453V15.1942C10.9487 14.9702 11.1274 14.6733 11.2081 14.3434C11.2888 14.0136 11.2676 13.6667 11.1473 13.3494C11.027 13.0321 10.8135 12.7597 10.5354 12.5688C10.2574 12.3779 9.92812 12.2777 9.59201 12.2817ZM15.112 7.81808V5.58626C15.112 4.10647 14.5304 2.68729 13.4952 1.64092C12.46 0.594557 11.056 0.00671387 9.59201 0.00671387C8.12801 0.00671387 6.72398 0.594557 5.68878 1.64092C4.65358 2.68729 4.07201 4.10647 4.07201 5.58626V7.81808C3.19361 7.81808 2.35119 8.17078 1.73007 8.7986C1.10895 9.42642 0.76001 10.2779 0.76001 11.1658V18.9772C0.76001 19.865 1.10895 20.7165 1.73007 21.3444C2.35119 21.9722 3.19361 22.3249 4.07201 22.3249H15.112C15.9904 22.3249 16.8328 21.9722 17.4539 21.3444C18.0751 20.7165 18.424 19.865 18.424 18.9772V11.1658C18.424 10.2779 18.0751 9.42642 17.4539 8.7986C16.8328 8.17078 15.9904 7.81808 15.112 7.81808ZM6.28001 5.58626C6.28001 4.69839 6.62895 3.84688 7.25007 3.21906C7.87119 2.59124 8.71361 2.23853 9.59201 2.23853C10.4704 2.23853 11.3128 2.59124 11.9339 3.21906C12.5551 3.84688 12.904 4.69839 12.904 5.58626V7.81808H6.28001V5.58626ZM16.216 18.9772C16.216 19.2731 16.0997 19.557 15.8927 19.7662C15.6856 19.9755 15.4048 20.0931 15.112 20.0931H4.07201C3.77921 20.0931 3.4984 19.9755 3.29136 19.7662C3.08432 19.557 2.96801 19.2731 2.96801 18.9772V11.1658C2.96801 10.8698 3.08432 10.586 3.29136 10.3767C3.4984 10.1675 3.77921 10.0499 4.07201 10.0499H15.112C15.4048 10.0499 15.6856 10.1675 15.8927 10.3767C16.0997 10.586 16.216 10.8698 16.216 11.1658V18.9772Z"
            fill="black"
          />
        </svg>
        <svg
          v-else
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="passwordChange = 'password'"
        >
          <title>{{ $t('Login.popUps[0].Title_Password_Hide_Icon') }}</title>
          <path
            d="M8.83194 12.275C9.16806 12.271 9.49731 12.3712 9.77538 12.5621C10.0534 12.753 10.267 13.0254 10.3872 13.3427C10.5075 13.66 10.5287 14.0069 10.448 14.3367C10.3673 14.6665 10.1886 14.9635 9.93594 15.1875V16.7386C9.93594 17.0346 9.81963 17.3184 9.61259 17.5277C9.40555 17.737 9.12474 17.8545 8.83194 17.8545C8.53914 17.8545 8.25834 17.737 8.0513 17.5277C7.84426 17.3184 7.72794 17.0346 7.72794 16.7386V15.1875C7.47525 14.9635 7.29654 14.6665 7.21585 14.3367C7.13517 14.0069 7.15638 13.66 7.27664 13.3427C7.39691 13.0254 7.61044 12.753 7.88851 12.5621C8.16658 12.3712 8.49583 12.271 8.83194 12.275ZM3.31194 7.81136V5.57955C3.31194 4.09976 3.89352 2.68058 4.92872 1.63421C5.96392 0.587843 7.36795 0 8.83194 0C10.2959 0 11.7 0.587843 12.7352 1.63421C13.7704 2.68058 14.3519 4.09976 14.3519 5.57955V7.81136C15.2303 7.81136 16.0728 8.16407 16.6939 8.79189C17.315 9.41971 17.6639 10.2712 17.6639 11.1591V18.9705C17.6639 19.8583 17.315 20.7098 16.6939 21.3377C16.0728 21.9655 15.2303 22.3182 14.3519 22.3182H3.31194C2.43355 22.3182 1.59113 21.9655 0.970009 21.3377C0.348889 20.7098 -5.34058e-05 19.8583 -5.34058e-05 18.9705V11.1591C-5.34058e-05 10.2712 0.348889 9.41971 0.970009 8.79189C1.59113 8.16407 2.43355 7.81136 3.31194 7.81136ZM12.1439 5.57955C12.1439 4.69167 11.795 3.84017 11.1739 3.21234C10.5528 2.58452 9.71034 2.23182 8.83194 2.23182C7.95355 2.23182 7.11113 2.58452 6.49001 3.21234C5.86889 3.84017 5.51995 4.69167 5.51995 5.57955H3.31194V7.81136H12.1439V5.57955ZM2.20795 18.9705C2.20795 19.2664 2.32426 19.5502 2.5313 19.7595C2.73834 19.9688 3.01915 20.0864 3.31194 20.0864H14.3519C14.6447 20.0864 14.9255 19.9688 15.1326 19.7595C15.3396 19.5502 15.4559 19.2664 15.4559 18.9705V11.1591C15.4559 10.8631 15.3396 10.5793 15.1326 10.37C14.9255 10.1607 14.6447 10.0432 14.3519 10.0432H3.31194C3.01915 10.0432 2.73834 10.1607 2.5313 10.37C2.32426 10.5793 2.20795 10.8631 2.20795 11.1591V18.9705Z"
            fill="black"
          />
        </svg>
      </div>
      <BtnPrimary
        type="button"
        text="Login"
        :title="$t('Login.popUps[0].Title_Button_Login')"
        @click.native="MakeLogin()"
      />
    </form>

    <form v-if="account" class="account" novalidate>
      <div>
        <span>
          <p>{{ $t('Login.popUps[1].Greeting') }}</p>
          <strong>{{ $t('Login.popUps[1].Label') }}</strong>
        </span>
        <svg
          class="close"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="account = false"
        >
          <title>{{ $t('Login.close_title') }}</title>
          <path
            d="M21.9599 11.8954C21.8316 11.7647 21.6789 11.6609 21.5108 11.5901C21.3426 11.5193 21.1622 11.4828 20.9801 11.4828C20.7979 11.4828 20.6175 11.5193 20.4493 11.5901C20.2812 11.6609 20.1285 11.7647 20.0003 11.8954L16.8401 15.1037L13.6799 11.8954C13.42 11.6328 13.0676 11.4852 12.7001 11.4852C12.3326 11.4852 11.9801 11.6328 11.7203 11.8954C11.4604 12.1581 11.3144 12.5143 11.3144 12.8858C11.3144 13.2573 11.4604 13.6135 11.7203 13.8762L14.8943 17.0705L11.7203 20.2648C11.5909 20.3944 11.4882 20.5487 11.4182 20.7187C11.3481 20.8887 11.3121 21.071 11.3121 21.2551C11.3121 21.4393 11.3481 21.6216 11.4182 21.7916C11.4882 21.9615 11.5909 22.1158 11.7203 22.2455C11.8485 22.3762 12.0012 22.48 12.1693 22.5508C12.3375 22.6216 12.5179 22.6581 12.7001 22.6581C12.8822 22.6581 13.0626 22.6216 13.2308 22.5508C13.3989 22.48 13.5516 22.3762 13.6799 22.2455L16.8401 19.0373L20.0003 22.2455C20.1285 22.3762 20.2812 22.48 20.4493 22.5508C20.6175 22.6216 20.7979 22.6581 20.9801 22.6581C21.1622 22.6581 21.3426 22.6216 21.5108 22.5508C21.6789 22.48 21.8316 22.3762 21.9599 22.2455C22.0892 22.1158 22.1919 21.9615 22.2619 21.7916C22.332 21.6216 22.3681 21.4393 22.3681 21.2551C22.3681 21.071 22.332 20.8887 22.2619 20.7187C22.1919 20.5487 22.0892 20.3944 21.9599 20.2648L18.7859 17.0705L21.9599 13.8762C22.0892 13.7465 22.1919 13.5922 22.2619 13.4222C22.332 13.2523 22.3681 13.0699 22.3681 12.8858C22.3681 12.7017 22.332 12.5193 22.2619 12.3494C22.1919 12.1794 22.0892 12.0251 21.9599 11.8954ZM26.5967 7.20862C25.3237 5.87636 23.8009 4.8137 22.1172 4.08266C20.4336 3.35161 18.6227 2.96682 16.7904 2.95072C14.958 2.93463 13.1409 3.28756 11.4449 3.98892C9.74892 4.69028 8.20813 5.72603 6.91241 7.03572C5.61669 8.34542 4.592 9.90284 3.89812 11.6171C3.20425 13.3314 2.85508 15.1681 2.871 17.0203C2.88693 18.8724 3.26762 20.7028 3.99086 22.4046C4.71411 24.1064 5.76542 25.6456 7.08346 26.9323C8.35647 28.2646 9.87922 29.3272 11.5629 30.0583C13.2465 30.7893 15.0574 31.1741 16.8897 31.1902C18.7221 31.2063 20.5393 30.8534 22.2352 30.152C23.9312 29.4507 25.472 28.4149 26.7677 27.1052C28.0634 25.7955 29.0881 24.2381 29.782 22.5238C30.4759 20.8096 30.825 18.9728 30.8091 17.1207C30.7932 15.2685 30.4125 13.4382 29.6893 11.7364C28.966 10.0345 27.9147 8.49536 26.5967 7.20862ZM24.6509 24.9655C22.8459 26.792 20.4702 27.9294 17.9286 28.184C15.387 28.4385 12.8367 27.7944 10.7122 26.3615C8.58771 24.9285 7.02047 22.7954 6.2775 20.3254C5.53453 17.8555 5.66179 15.2015 6.6376 12.8158C7.61341 10.43 9.3774 8.46004 11.629 7.24148C13.8807 6.02293 16.4806 5.63118 18.986 6.13298C21.4913 6.63478 23.747 7.99909 25.3688 9.99345C26.9906 11.9878 27.878 14.4889 27.8801 17.0705C27.885 18.5369 27.6021 19.9897 27.0478 21.3449C26.4935 22.7001 25.6788 23.9307 24.6509 24.9655Z"
            fill="#EA063F"
          />
        </svg>
      </div>
      <div class="input">
        <input
          ref="name_account"
          v-model="name_account"
          type="text"
          :placeholder="$t('Login.popUps[1].Placeholder_Name')"
          :title="$t('Login.popUps[1].Title_Name')"
        />
      </div>
      <div class="input">
        <input
          ref="R_email_account"
          v-model="email_account"
          type="email"
          :placeholder="$t('Login.popUps[1].Placeholder_Email')"
          :title="$t('Login.popUps[1].Title_Email')"
        />
      </div>
      <div class="input">
        <input
          ref="R_password_account"
          v-model="password_account"
          :type="Account_passwordChange"
          :placeholder="$t('Login.popUps[1].Placeholder_Password')"
          :title="$t('Login.popUps[1].Title_Password')"
        />

        <svg
          v-if="Account_passwordChange == 'password'"
          width="19"
          height="23"
          viewBox="0 0 19 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="Account_passwordChange = 'text'"
        >
          <title>{{ $t('Login.popUps[1].Title_Password_Show_Icon') }}</title>
          <path
            d="M9.59201 12.2817C9.25589 12.2777 8.92664 12.3779 8.64857 12.5688C8.37051 12.7597 8.15697 13.0321 8.03671 13.3494C7.91644 13.6667 7.89523 14.0136 7.97591 14.3434C8.0566 14.6733 8.23532 14.9702 8.48801 15.1942V16.7453C8.48801 17.0413 8.60432 17.3251 8.81136 17.5344C9.0184 17.7437 9.29921 17.8613 9.59201 17.8613C9.88481 17.8613 10.1656 17.7437 10.3727 17.5344C10.5797 17.3251 10.696 17.0413 10.696 16.7453V15.1942C10.9487 14.9702 11.1274 14.6733 11.2081 14.3434C11.2888 14.0136 11.2676 13.6667 11.1473 13.3494C11.027 13.0321 10.8135 12.7597 10.5354 12.5688C10.2574 12.3779 9.92812 12.2777 9.59201 12.2817ZM15.112 7.81808V5.58626C15.112 4.10647 14.5304 2.68729 13.4952 1.64092C12.46 0.594557 11.056 0.00671387 9.59201 0.00671387C8.12801 0.00671387 6.72398 0.594557 5.68878 1.64092C4.65358 2.68729 4.07201 4.10647 4.07201 5.58626V7.81808C3.19361 7.81808 2.35119 8.17078 1.73007 8.7986C1.10895 9.42642 0.76001 10.2779 0.76001 11.1658V18.9772C0.76001 19.865 1.10895 20.7165 1.73007 21.3444C2.35119 21.9722 3.19361 22.3249 4.07201 22.3249H15.112C15.9904 22.3249 16.8328 21.9722 17.4539 21.3444C18.0751 20.7165 18.424 19.865 18.424 18.9772V11.1658C18.424 10.2779 18.0751 9.42642 17.4539 8.7986C16.8328 8.17078 15.9904 7.81808 15.112 7.81808ZM6.28001 5.58626C6.28001 4.69839 6.62895 3.84688 7.25007 3.21906C7.87119 2.59124 8.71361 2.23853 9.59201 2.23853C10.4704 2.23853 11.3128 2.59124 11.9339 3.21906C12.5551 3.84688 12.904 4.69839 12.904 5.58626V7.81808H6.28001V5.58626ZM16.216 18.9772C16.216 19.2731 16.0997 19.557 15.8927 19.7662C15.6856 19.9755 15.4048 20.0931 15.112 20.0931H4.07201C3.77921 20.0931 3.4984 19.9755 3.29136 19.7662C3.08432 19.557 2.96801 19.2731 2.96801 18.9772V11.1658C2.96801 10.8698 3.08432 10.586 3.29136 10.3767C3.4984 10.1675 3.77921 10.0499 4.07201 10.0499H15.112C15.4048 10.0499 15.6856 10.1675 15.8927 10.3767C16.0997 10.586 16.216 10.8698 16.216 11.1658V18.9772Z"
            fill="black"
          />
        </svg>
        <svg
          v-else
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="Account_passwordChange = 'password'"
        >
          <title>{{ $t('Login.popUps[1].Title_Password_Hide_Icon') }}</title>

          <path
            d="M8.83194 12.275C9.16806 12.271 9.49731 12.3712 9.77538 12.5621C10.0534 12.753 10.267 13.0254 10.3872 13.3427C10.5075 13.66 10.5287 14.0069 10.448 14.3367C10.3673 14.6665 10.1886 14.9635 9.93594 15.1875V16.7386C9.93594 17.0346 9.81963 17.3184 9.61259 17.5277C9.40555 17.737 9.12474 17.8545 8.83194 17.8545C8.53914 17.8545 8.25834 17.737 8.0513 17.5277C7.84426 17.3184 7.72794 17.0346 7.72794 16.7386V15.1875C7.47525 14.9635 7.29654 14.6665 7.21585 14.3367C7.13517 14.0069 7.15638 13.66 7.27664 13.3427C7.39691 13.0254 7.61044 12.753 7.88851 12.5621C8.16658 12.3712 8.49583 12.271 8.83194 12.275ZM3.31194 7.81136V5.57955C3.31194 4.09976 3.89352 2.68058 4.92872 1.63421C5.96392 0.587843 7.36795 0 8.83194 0C10.2959 0 11.7 0.587843 12.7352 1.63421C13.7704 2.68058 14.3519 4.09976 14.3519 5.57955V7.81136C15.2303 7.81136 16.0728 8.16407 16.6939 8.79189C17.315 9.41971 17.6639 10.2712 17.6639 11.1591V18.9705C17.6639 19.8583 17.315 20.7098 16.6939 21.3377C16.0728 21.9655 15.2303 22.3182 14.3519 22.3182H3.31194C2.43355 22.3182 1.59113 21.9655 0.970009 21.3377C0.348889 20.7098 -5.34058e-05 19.8583 -5.34058e-05 18.9705V11.1591C-5.34058e-05 10.2712 0.348889 9.41971 0.970009 8.79189C1.59113 8.16407 2.43355 7.81136 3.31194 7.81136ZM12.1439 5.57955C12.1439 4.69167 11.795 3.84017 11.1739 3.21234C10.5528 2.58452 9.71034 2.23182 8.83194 2.23182C7.95355 2.23182 7.11113 2.58452 6.49001 3.21234C5.86889 3.84017 5.51995 4.69167 5.51995 5.57955H3.31194V7.81136H12.1439V5.57955ZM2.20795 18.9705C2.20795 19.2664 2.32426 19.5502 2.5313 19.7595C2.73834 19.9688 3.01915 20.0864 3.31194 20.0864H14.3519C14.6447 20.0864 14.9255 19.9688 15.1326 19.7595C15.3396 19.5502 15.4559 19.2664 15.4559 18.9705V11.1591C15.4559 10.8631 15.3396 10.5793 15.1326 10.37C14.9255 10.1607 14.6447 10.0432 14.3519 10.0432H3.31194C3.01915 10.0432 2.73834 10.1607 2.5313 10.37C2.32426 10.5793 2.20795 10.8631 2.20795 11.1591V18.9705Z"
            fill="black"
          />
        </svg>
      </div>
      <div class="input">
        <input
          ref="R_confirm_password"
          v-model="confirm_password"
          :placeholder="$t('Login.popUps[1].Placeholder_ConfirmPassword')"
          :title="$t('Login.popUps[1].Title_ConfirmPassword')"
          :type="Confirm_passwordChange"
        />
        <svg
          v-if="Confirm_passwordChange == 'password'"
          width="19"
          height="23"
          viewBox="0 0 19 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="Confirm_passwordChange = 'text'"
        >
          <title>{{ $t('Login.popUps[1].Title_Password_Show_Icon') }}</title>

          <path
            d="M9.59201 12.2817C9.25589 12.2777 8.92664 12.3779 8.64857 12.5688C8.37051 12.7597 8.15697 13.0321 8.03671 13.3494C7.91644 13.6667 7.89523 14.0136 7.97591 14.3434C8.0566 14.6733 8.23532 14.9702 8.48801 15.1942V16.7453C8.48801 17.0413 8.60432 17.3251 8.81136 17.5344C9.0184 17.7437 9.29921 17.8613 9.59201 17.8613C9.88481 17.8613 10.1656 17.7437 10.3727 17.5344C10.5797 17.3251 10.696 17.0413 10.696 16.7453V15.1942C10.9487 14.9702 11.1274 14.6733 11.2081 14.3434C11.2888 14.0136 11.2676 13.6667 11.1473 13.3494C11.027 13.0321 10.8135 12.7597 10.5354 12.5688C10.2574 12.3779 9.92812 12.2777 9.59201 12.2817ZM15.112 7.81808V5.58626C15.112 4.10647 14.5304 2.68729 13.4952 1.64092C12.46 0.594557 11.056 0.00671387 9.59201 0.00671387C8.12801 0.00671387 6.72398 0.594557 5.68878 1.64092C4.65358 2.68729 4.07201 4.10647 4.07201 5.58626V7.81808C3.19361 7.81808 2.35119 8.17078 1.73007 8.7986C1.10895 9.42642 0.76001 10.2779 0.76001 11.1658V18.9772C0.76001 19.865 1.10895 20.7165 1.73007 21.3444C2.35119 21.9722 3.19361 22.3249 4.07201 22.3249H15.112C15.9904 22.3249 16.8328 21.9722 17.4539 21.3444C18.0751 20.7165 18.424 19.865 18.424 18.9772V11.1658C18.424 10.2779 18.0751 9.42642 17.4539 8.7986C16.8328 8.17078 15.9904 7.81808 15.112 7.81808ZM6.28001 5.58626C6.28001 4.69839 6.62895 3.84688 7.25007 3.21906C7.87119 2.59124 8.71361 2.23853 9.59201 2.23853C10.4704 2.23853 11.3128 2.59124 11.9339 3.21906C12.5551 3.84688 12.904 4.69839 12.904 5.58626V7.81808H6.28001V5.58626ZM16.216 18.9772C16.216 19.2731 16.0997 19.557 15.8927 19.7662C15.6856 19.9755 15.4048 20.0931 15.112 20.0931H4.07201C3.77921 20.0931 3.4984 19.9755 3.29136 19.7662C3.08432 19.557 2.96801 19.2731 2.96801 18.9772V11.1658C2.96801 10.8698 3.08432 10.586 3.29136 10.3767C3.4984 10.1675 3.77921 10.0499 4.07201 10.0499H15.112C15.4048 10.0499 15.6856 10.1675 15.8927 10.3767C16.0997 10.586 16.216 10.8698 16.216 11.1658V18.9772Z"
            fill="black"
          />
        </svg>
        <svg
          v-else
          width="18"
          height="23"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="Confirm_passwordChange = 'password'"
        >
          <title>{{ $t('Login.popUps[1].Title_Password_Hide_Icon') }}</title>

          <path
            d="M8.83194 12.275C9.16806 12.271 9.49731 12.3712 9.77538 12.5621C10.0534 12.753 10.267 13.0254 10.3872 13.3427C10.5075 13.66 10.5287 14.0069 10.448 14.3367C10.3673 14.6665 10.1886 14.9635 9.93594 15.1875V16.7386C9.93594 17.0346 9.81963 17.3184 9.61259 17.5277C9.40555 17.737 9.12474 17.8545 8.83194 17.8545C8.53914 17.8545 8.25834 17.737 8.0513 17.5277C7.84426 17.3184 7.72794 17.0346 7.72794 16.7386V15.1875C7.47525 14.9635 7.29654 14.6665 7.21585 14.3367C7.13517 14.0069 7.15638 13.66 7.27664 13.3427C7.39691 13.0254 7.61044 12.753 7.88851 12.5621C8.16658 12.3712 8.49583 12.271 8.83194 12.275ZM3.31194 7.81136V5.57955C3.31194 4.09976 3.89352 2.68058 4.92872 1.63421C5.96392 0.587843 7.36795 0 8.83194 0C10.2959 0 11.7 0.587843 12.7352 1.63421C13.7704 2.68058 14.3519 4.09976 14.3519 5.57955V7.81136C15.2303 7.81136 16.0728 8.16407 16.6939 8.79189C17.315 9.41971 17.6639 10.2712 17.6639 11.1591V18.9705C17.6639 19.8583 17.315 20.7098 16.6939 21.3377C16.0728 21.9655 15.2303 22.3182 14.3519 22.3182H3.31194C2.43355 22.3182 1.59113 21.9655 0.970009 21.3377C0.348889 20.7098 -5.34058e-05 19.8583 -5.34058e-05 18.9705V11.1591C-5.34058e-05 10.2712 0.348889 9.41971 0.970009 8.79189C1.59113 8.16407 2.43355 7.81136 3.31194 7.81136ZM12.1439 5.57955C12.1439 4.69167 11.795 3.84017 11.1739 3.21234C10.5528 2.58452 9.71034 2.23182 8.83194 2.23182C7.95355 2.23182 7.11113 2.58452 6.49001 3.21234C5.86889 3.84017 5.51995 4.69167 5.51995 5.57955H3.31194V7.81136H12.1439V5.57955ZM2.20795 18.9705C2.20795 19.2664 2.32426 19.5502 2.5313 19.7595C2.73834 19.9688 3.01915 20.0864 3.31194 20.0864H14.3519C14.6447 20.0864 14.9255 19.9688 15.1326 19.7595C15.3396 19.5502 15.4559 19.2664 15.4559 18.9705V11.1591C15.4559 10.8631 15.3396 10.5793 15.1326 10.37C14.9255 10.1607 14.6447 10.0432 14.3519 10.0432H3.31194C3.01915 10.0432 2.73834 10.1607 2.5313 10.37C2.32426 10.5793 2.20795 10.8631 2.20795 11.1591V18.9705Z"
            fill="black"
          />
        </svg>
      </div>
      <BtnPrimary
        type="button"
        :title="$t('Login.popUps[1].Title_Button')"
        :text="$t('Login.popUps[1].Text_Button')"
        @click.native="MakeAccount()"
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      login: false,
      account: false,
      passwordChange: 'password',
      Confirm_passwordChange: 'password',
      Account_passwordChange: 'password',

      /* V models */
      email_login: '',
      password_login: '',

      name_account: '',
      email_account: '',
      confirm_password: '',
      password_account: '',
    }
  },
  computed: {
    ...mapState({
      NotifyView: (state) => state.Notification.view,
      NotifyText: (state) => state.Notification.text,
    }),
  },
  methods: {
    ...mapActions({
      SetUser: 'User/SetUser',
      SetNotify: 'Notification/SetNotify',
    }),
    ...mapMutations({
      OpenNotify: 'Notification/OpenNotify',
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
            User: response.response[0],
          })
          return this.$router.push('/')
        })
        .catch(() => {
          this.SetNotify(this.$t('Login.Error.Login'))
        })
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

      await this.$axios
        .$post('/dev/users/', {
          name: this.name_account,
          email: this.email_account,
          password: this.confirm_password,
        })
        .then((response) => {
          this.SetUser({
            User: response.Response[0],
          })
          return this.$router.push('/')
        })
        .catch(() => {
          this.SetNotify(this.$t('Login.Error.Account'))
        })
    },

    validName(name) {
      const regex = /^([a-z]{2,}([\s-][a-z]{2,})+)$/gi

      if (!name) {
        this.$refs.name_account.focus()
        this.SetNotify(this.$t('Login.Error.Null_name'))

        return false
      }
      if (!regex.test(name)) {
        this.$refs.name_account.focus()

        this.SetNotify(this.$t('Login.Error.Invalid_name'))
        return false
      }

      return true
    },

    async validEmailAccount(email) {
      const regex =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi

      if (!email) {
        this.$refs.R_email_account.focus()
        this.SetNotify(this.$t('Login.Error.Null_email'))
        return false
      } else if (!regex.test(email)) {
        this.$refs.R_email_account.focus()

        this.SetNotify(this.$t('Login.Error.Invalid_email'))
        return false
      }
      await this.$axios
        .$get(`/dev/users/search/${email}`)
        .then((response) => {
          this.$refs.R_email_account.focus()

          this.SetNotify(this.$t('Login.Error.Duplicate_email'))
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
        this.$refs.email_login.focus()
        this.SetNotify(this.$t('Login.Error.Null_email'))
        return false
      } else if (!regex.test(email)) {
        this.$refs.email_login.focus()

        this.SetNotify(this.$t('Login.Error.Invalid_email'))
        return false
      }

      await this.$axios
        .$get(`/dev/users/search/${email}`)
        .then((response) => {
          return true
        })
        .catch(() => {
          this.$refs.email_login.focus()

          this.SetNotify(this.$t('Login.Error.Unregistered_email'))
          return false
        })
    },
    validPasswordAccount(password, confirmPassword) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

      if (!password) {
        this.$refs.R_password_account.focus()

        this.SetNotify(this.$t('Login.Error.Null_password'))
        return false
      } else if (!confirmPassword) {
        this.$refs.R_confirm_password.focus()

        this.SetNotify(this.$t('Login.Error.Null_password'))
        return false
      } else if (!regex.test(password)) {
        this.$refs.R_password_account.focus()

        this.SetNotify(this.$t('Login.Error.Null_password'))
        return false
      } else if (password !== confirmPassword) {
        this.$refs.R_confirm_password.focus()

        this.SetNotify(this.$t('Login.Error.Null_password_confirmation'))
        return false
      }

      return true
    },
    validPassword(password) {
      const regex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/

      if (!password) {
        this.$refs.R_password_login.focus()

        this.SetNotify(this.$t('Login.Error.Null_password'))
        return false
      } else if (!regex.test(password)) {
        this.$refs.R_password_login.focus()

        this.SetNotify(this.$t('Login.Error.Null_password'))
        return false
      }

      return true
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../static/Scss/mixins.scss';
@import '../static/Scss/color.scss';

.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: $PrimaryColor;

  div {
    width: 100%;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    button {
      width: 80%;
      height: 40px;

      background: $white;
      transition: 0.7s ease-in-out;

      @include bold-text($PrimaryColor);
      @include ButtonHoverToTransparent($white);

      &:last-child {
        border: solid 2px $white;
        background: transparent;
        color: $white;
        transition: 0.7s ease-in-out;

        @include ButtonHoverToSolidColor($white, $PrimaryColor);
      }
    }
  }
  svg {
    width: 100px;
    height: 100px;
  }
  aside {
    width: 100%;
    height: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    h1 {
      font-size: 25px;
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

      color: $white;
      text-align: center;
      font-family: 'Montserrat', 'Helvetica';
      line-height: 20px;
      font-size: 16px;
    }
  }

  div.blur {
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.596);

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    cursor: pointer;
  }

  form {
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

    div {
      width: 88%;
      height: 55px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row;

      span {
        height: 50px;

        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
        flex-direction: column;
        strong {
          @include bold-text($PrimaryColor);
        }
      }

      svg.close {
        width: 30px;
        height: 30px;
        cursor: pointer;

        &:hover {
          transform: rotate(360deg);
          transition: transform 0.7s ease-in-out;
        }
      }
    }

    .input {
      width: 88%;
      height: 40px;

      border: none;
      border: 1px solid $black;
      border-radius: 8px;
      position: relative;

      @include placeholder(#000);

      svg {
        width: 20px;
        height: 20px;

        position: absolute;
        right: 5px;

        cursor: pointer;
      }

      input {
        width: 100%;
        height: 100%;

        border: none;
        border-radius: 8px;
        padding: 5px;
      }
    }

    button {
      width: 88%;
      height: 40px;
      transition: 0.7s ease-in-out;
      @include bold-text(#fff);

      &:hover {
        background-color: transparent;
        color: $PrimaryColor;
        border: 1px solid $PrimaryColor;
      }
    }
  }

  form.account {
    height: 400px;
  }
}
</style>
