import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";

// 创建 Pinia 实例
const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')
