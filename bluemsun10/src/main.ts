import './assets/main.css';
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import { createPinia } from 'pinia'
import App from './App.vue';

const app = createApp(App);
app.use(ElementPlus, {locale: zhCn});
// app.use(createPinia())

// 路由
import router from './router/index';
app.use(router);

app.mount('#app');
