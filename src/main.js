import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './assets/styles.css';
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
app.use(store);
app.use(Toast);
app.mount('#app');

