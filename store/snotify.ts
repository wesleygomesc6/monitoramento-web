import Vue from 'vue'
import { SnotifyToastConfig } from 'vue-snotify'
import { ActionTree } from 'vuex'

const config = {
  timeout: 2000,
  showProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
} as SnotifyToastConfig

export const state = () => ({

})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  successNotify (_context, { title, msg }) {
    Vue.prototype.$snotify.success(msg, title, config)
  },
  infoNotify (_context, { title, msg }) {
    Vue.prototype.$snotify.info(msg, title, config)
  },
  warnNotify (_context, { title, msg }) {
    Vue.prototype.$snotify.warning(msg, title, config)
  },
  errorNotify (_context, { title, msg }) {
    Vue.prototype.$snotify.error(msg, title, config)
  }
}
