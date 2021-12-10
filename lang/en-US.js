export default {
  Title_Icon: 'Chat App. Icon',
  Login: {
    label: 'Welcome',
    text: `Lorem ipsum dolor sit amet qweqwe
            consectetur adipisicing elit.
            Voluptas asperiores placeat.`,

    close_title: 'Close',

    buttons: [
      { text: 'Login', type: 'button' },
      { text: 'Create Account', type: 'button' },
    ],
    Error: {
      Null_email: 'Email format is Invalid',
      Null_password: 'Password format is Invalid',
      Null_name: 'Name format is Invalid',
      Null_password_confirmation: 'Passwords not Match',

      Login: 'Email and Password is incorrect!',
      Account: "Error Creating Account!"
    },
    popUps: [
      {
        Label: 'Login',
        Greeting: 'Wellcome Back',

        Placeholder_Email: '*Email',
        Title_Email: 'Email input',

        Placeholder_Password: '*Password',
        Title_Password: 'Password input',

        Title_Password_Hide_Icon: 'Password Hide',
        Title_Password_Show_Icon: 'Password Show',

        Title_Button_Login: 'Click to login',
        Button_Text: 'Login',
      },
      {
        Label: 'Create Account',
        Greeting: 'Wellcome',

        Placeholder_Name: '*Name',
        Title_Name: 'Name input',

        Placeholder_Email: '*Email',
        Title_Email: 'Email input',

        Placeholder_Password: '*Password',
        Title_Password: 'Password input',

        Placeholder_ConfirmPassword: '*Confirm Password',
        Title_ConfirmPassword: 'Confirm Password input',

        Title_Password_Hide_Icon: 'Password Hide',
        Title_Password_Show_Icon: 'Password Show',

        Title_Button: 'Click to Create Your Account',
        Text_Button: 'Create Account',
      },
    ],
  },
}
