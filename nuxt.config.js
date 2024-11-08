import colors from 'vuetify/es5/util/colors'

export default {
  head: {
    titleTemplate: '%s',
    title: 'app-monitoramento',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favico.svg' }
    ]
  },

  css: [
  ],

  plugins: [
    { src: '@plugins/snotify', ssr: false },
    { src: '@plugins/v-mask', ssr: false },
    { src: '@/plugins/api' },
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/auth-next'
  ],

  router: {
    // middleware: ['auth'],
  },
  publicRuntimeConfig: {
    inventarioURL: process.env.INVENTARIO_URL,
    dynaURL: process.env.DYNA_URL,
    urlv2: process.env.URL_V2,
    token: process.env.TOKEN
  },

  axios: {
    baseURL: process.env.BASE_URL,
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: process.env.LOGIN_URL, method: 'post', propertyName: 'token' },
          user: false,
          logout: false
        }
      }
    },
    redirect: {
      //login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#044f6f',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
}
