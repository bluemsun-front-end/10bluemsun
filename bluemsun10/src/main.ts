import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
 const app = createApp(App)


// 路由
import router from './router/index'
app.use(router)
app.use(ElementPlus);

app.mount('#app')