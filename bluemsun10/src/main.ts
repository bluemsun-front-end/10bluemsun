import './assets/main.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())

// 路由
import router from './router'
app.use(router)


app.mount('#app')
