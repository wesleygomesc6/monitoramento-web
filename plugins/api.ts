/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: NuxtAxiosInstance
  }

  interface Context {
    $api: NuxtAxiosInstance
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $api: NuxtAxiosInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: NuxtAxiosInstance
  }
}

const axiosApi: Plugin = ({ $axios }, inject) => {
  const options: Object = {
    baseURL: process.env.apiBaseUrl,
    timeout: 1000 * 60,
    maxContentLength: 5242880,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }
  const api: NuxtAxiosInstance = $axios.create(options)

  inject('api', api)
}

export default axiosApi
