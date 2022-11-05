import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/font/font.css'

var app = createApp(App)
app.config.globalProperties.uid2face = {}
app.mount('#app')
