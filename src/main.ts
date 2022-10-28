import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

import vant from 'vant'
import 'vant/lib/index.css'

import './style/index.scss'

createApp(App).use(router).use(store).use(vant).mount('#app')
