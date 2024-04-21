import { createApp } from 'vue'
import vSelect from 'vue-select'
import { useToast } from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

import './assets/styles/main.css'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import 'vue-select/dist/vue-select.css'

const app = createApp(App)

app.use(router)

app.provide('toast', useToast({ position: 'top' }))

app.component('VSelect', vSelect)

app.mount('#app')
