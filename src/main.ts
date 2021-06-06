import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(ElementPlus).mount('#app');
