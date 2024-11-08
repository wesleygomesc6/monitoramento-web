import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'

const options = {
  toast: {
    position: SnotifyPosition.rightTop,
    titleMaxLength: 150,
    bodyMaxLength: 200,
    timeout: 4000
  }
}

Vue.use(Snotify, options)
