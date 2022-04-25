import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
import '@/assets/css/global.scss';
import element from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import vue3VideoPlay from 'vue3-video-play';
import 'vue3-video-play/dist/style.css';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App)
  .use(store)
  .use(router)
  .use(vue3VideoPlay)
  .use(element)
  .mount('#app');
