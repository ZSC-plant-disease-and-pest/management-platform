import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from './store';
import router from './router';
// 导入全局 css 文件
import '@/assets/css/global.scss';
// 引入 element-plus
import element from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
// 引入视频播放器组件和样式
import vue3VideoPlay from 'vue3-video-play';
import 'vue3-video-play/dist/style.css';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(vue3VideoPlay).use(element).mount('#app');
