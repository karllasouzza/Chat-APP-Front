export default {
  env: {
    SUPABASE_URL: process.env.ENV_SUPABASE_URL,
    SUPABASE_KEY: process.env.ENV_SUPABASE_KEY,
  },

  ssr: false,

  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  target: 'static',

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
        href: 'https://fonts.googleapis.com/css2?family=Montserrat&family=Raleway:wght@700&display=swap',
        rel: 'stylesheet',
      },
    ],
  },

  // css: [
  //   './static/Scss/color.scss',
  //   './static/Scss/reset.scss',
  //   './static/Scss/mixins.scss',
  //   './static/Scss/transitions.scss',
  // ],

  styleResources: {
    scss: [
      './static/Scss/color.scss',
      './static/Scss/reset.scss',
      './static/Scss/mixins.scss',
      './static/Scss/transitions.scss',
    ],
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

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
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
    // manifest: {
    //   name: 'aplicativo de chat ao vivo',
    //   short_name: 'Chat App',
    // },
  },

  // i18n
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
      /*  {
        code: 'es',
        file: 'es-ES.js',
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
      }, */
    ],
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
    lazy: true,
    langDir: 'lang/',
  },

  // axios: {
  //   proxy: true,
  //   retry: { retries: 3 },
  // },

  // proxy: {
  //   '/api/': {
  //     target: 'https://chat-app-karlla.herokuapp.com/',
  //     pathRewrite: { '^/api/': '' },
  //   },
  //   '/dev/': {
  //     target: 'http://localhost:4000',
  //     pathRewrite: { '^/dev/': '' },
  //   },
  // },

  toast: {
    timeout: 2000,
    closeOnClick: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
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
