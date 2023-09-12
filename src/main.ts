import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from './store'
import pageList from '@/components/pageList/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import { createPinia } from 'pinia'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('pageList', pageList)
app.use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')
