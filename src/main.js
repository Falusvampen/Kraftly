import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { initAuth } from './services/api';
import './assets/styles.css';

const app = createApp(App);
app.use(createPinia());

const initializeApp = async () => {
  await initAuth();
  app.use(router);
  app.mount('#app');
};

initializeApp();
