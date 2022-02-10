export default {
  Title_Icon: 'Chat App. Ícone',
  Login: {
    label: 'Bem-vindes',
    text: `Liberte-se de todo preconceito e se deixe vulnerável para se sentir amade.`,

    close_title: 'Fechar',

    buttons: [
      { text: 'Entrar', type: 'button' },
      { text: 'Criar Conta', type: 'button' },
    ],
    Error: {
      Null_name: 'Nome não é definido!',
      Invalid_name: 'Formato de Nome Invalido!',

      Null_email: 'Email não é definido!',
      Invalid_email: 'Formato de Email Invalido!',
      Duplicate_email: 'O Email ja esta cadastrado!',
      Unregistered_email: 'Email não registrado!',

      Null_password: 'Senha não definido!',
      Invalid_password: 'Formato de Senha Invalido!',
      Null_password_confirmation: 'As Senhas não coincidem!',

      Login: 'Email ou Senha Incorretos!',
      Account: 'Erro na Criação da Conta!',

      Error_Request: 'Desculpe, tente novamente!',
    },
    popUps: [
      {
        Label: 'Entrar',
        Greeting: 'Bem-vinde de volta!',

        Placeholder_Email: '*Email',
        Title_Email: 'Insira seu Email cadastrado!',

        Placeholder_Password: '*Senha',
        Title_Password: 'Insira sua Senha cadastrada!',

        Title_Password_Hide_Icon: 'Ocultar Senha',
        Title_Password_Show_Icon: 'Mostrar Senha',

        Title_Button_Login: 'Realizar o login!',
        Button_Text: 'Entrar',
      },
      {
        Label: 'Criar Conta',
        Greeting: 'Bem-vinde',

        Placeholder_Name: '*Nome Completo',
        Title_Name: 'Insira seu nome completo!',

        Placeholder_Email: '*Email',
        Title_Email: 'Insira seu melhor Email!',

        Placeholder_Password: '*Senha',
        Title_Password:
          'A senha deve conter: 1 letra, 1 letra maiúscula, 1 número, 1 caractere especial e no total deve ser 8 caracteres!',

        Placeholder_ConfirmPassword: '*Confirmar Senha',
        Title_ConfirmPassword: 'Confirme sua Senha!',

        Title_Button: 'Realizar o Cadastro da sua Conta!',
        Text_Button: 'Criar Conta',
      },
    ],
  },

  Greet: {
    hello: 'Olá',
    morning: 'Bom dia',
    afternoon: 'Boa tarde',
    night: 'Boa noite',
  },

  Navbar: {
    home: 'Inicio',
    chat: 'Mensagens',
    search: 'Procurar',
    profile: 'Perfil',
  },

  Icons: {
    dot: '.',
    chat: 'Mensagens',
    search: 'Procurar',
    home: 'Inicio',
    more: 'Adicionar',
    notification: 'Notificações',
    password_Hide: 'Ocultar Senha',
    password_Show: 'Mostrar Senha',
    close: 'Fechar',
    profile: 'Perfil',
    more_card: 'Expandir',
    send: 'Enviar',
  },
}
