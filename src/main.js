import {createApp} from 'vue'
import router from './router'
import store from './store'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'

import './index.css'
import './assets/tailwind.css'

createApp(App).use(router).use(store).use(Toast).mount('#app')
