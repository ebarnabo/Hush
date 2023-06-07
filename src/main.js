import './assets/style.scss';
import { themeMode } from './themeMode';
import { createApp } from 'vue';
import App from './App.vue';
import ToggleButton from './components/btn-mode.vue';

import { createRouter, createWebHashHistory } from 'vue-router';

// Importez vos composants .vue
import Home from './components/inscription.vue';
import Login from './components/login.vue';
import Chat from './components/ChatPage.vue';
import Validation from './components/validation.vue';


// Créez l'instance du routeur et définissez les routes
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/validation', component: Validation },
    { path: '/chat', component: Chat }
  ],
});

const app = createApp(App);
app.component('ToggleButton', ToggleButton);
app.use(router);
app.mixin(themeMode);
app.mount('#app');



