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
// 修改 element-plus 语言为中文
import locale from 'element-plus/lib/locale/lang/zh-cn';

const app = createApp(App);
app.config.globalProperties.$axios = axios;

createApp(App).use(store).use(router).use(element, { locale }).mount('#app');
