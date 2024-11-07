import './assets/main.css'
import 'vue3-toastify/dist/index.css'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersistedstate)
app.use(pinia)
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'auto',
  position: 'top-center',
  transition: 'flip'
} as ToastContainerOptions)

app.mount('#app')
