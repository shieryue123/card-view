import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store'
import pageList from '@/components/pageList/index'
// import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
    .use(pinia)
    .use(pageList)
    .use(ElementPlus)
    .mount('#app')
