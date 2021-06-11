import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
import element from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(element, { zhCn }).mount('#app');
