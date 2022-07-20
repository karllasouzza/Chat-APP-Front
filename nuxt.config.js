require('dotenv').config()

export default {
  env: {
    SUPABASE_URL: process.env.EXTERNAL_ENV_SUPABASE_URL,
    SUPABASE_KEY: process.env.EXTERNAL_ENV_SUPABASE_KEY,
  },

  ssr: true,
  target: 'static',
  components: true,

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  head: {
    title: 'Chat-APP',
    htmlAttrs: {
      lang: 'pt-BR',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap',
        rel: 'stylesheet',
      },
    ],
  },
  styleResources: {
    scss: './assets/Scss/main.scss',
  },

  plugins: [
    { src: './plugins/vuexPersistedState.js', mode: 'client' },
    { src: './plugins/auto-resize.js' },
    { src: './plugins/vlibras.js' },
    { src: './plugins/vue-chat-scroll.js' },
    { src: './plugins/VueObserveVisibility.js' },
    { src: './plugins/vue-toast.js', mode: 'client' },
    { src: './plugins/i18n.js' },
    { src: './plugins/supabase.js' },
    { src: './plugins/croppie.js', mode: 'client' },
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/i18n', '@nuxtjs/pwa', '@nuxtjs/dotenv'],

  dotenv: {
    path: './',
  },

  pwa: {
    meta: {
      title: 'Chat App',
      author: 'Karlla.Souzza',
    },
  },

  i18n: {
    defaultLocale: 'br',
    locales: [
      {
        code: 'br',
        file: 'pt-BR.js',
        iso: 'pt-BR',
      },
      {
        code: 'en',
        file: 'en-US.js',
        iso: 'en',
      },
    ],
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    lazy: true,
    langDir: 'lang/',
  },

  toast: {
    timeout: 2000,
    closeOnClick: false,
  },

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],

  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
}
