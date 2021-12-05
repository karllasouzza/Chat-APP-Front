export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Chat-APP',
    htmlAttrs: {
      lang: 'pt-br',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~static/Scss/color.scss',
    '~static/Scss/reset.scss',
    '~static/Scss/mixins.scss',
  ],

  styleResources: {
    scss: [
      '~static/Scss/color.scss',
      '~static/Scss/reset.scss',
      '~static/Scss/mixins.scss',
    ],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  // i18n
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
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
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },

  proxy: {
    '/api/': {
      target: 'https://chat-app-karlla.herokuapp.com/',
      pathRewrite: { '^/api/': '' },
    },
    '/apiDev/': {
      target: 'https://localhost:4000',
      pathRewrite: { '^/apiDev/': '' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
