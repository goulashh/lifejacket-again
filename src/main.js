import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import $bus from './globaleventbus';
import './style.css';

const app = createApp(App);
app.config.globalProperties.$bus = $bus;
app.use(router).mount('#app');