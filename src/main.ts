import { createApp } from 'vue'
import { useToast } from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

import './assets/styles/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(router)

app.provide('toast', useToast({ position: 'top' }))

app.mount('#app')
