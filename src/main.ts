import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store'
// import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')
