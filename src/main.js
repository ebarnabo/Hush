import './assets/style.scss';
import { themeMode } from './themeMode';
import { createApp } from 'vue';
import App from './App.vue';
// import du bouton de switch de mode de couleur
import ToggleButton from './components/btn-mode.vue';


import { createRouter, createWebHashHistory } from 'vue-router';

// Url des pages vue
import Home from './components/inscription.vue';
import Login from './components/login.vue';
import Chat from './components/ChatPage.vue';


// Créez l'instance du routeur et définissez les routes
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/chat', component: Chat },
    // Tous autres url non existant redirgera vers la page d'accueil
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  
});

const app = createApp(App);
app.component('ToggleButton', ToggleButton);
app.use(router);
app.mixin(themeMode);
app.mount('#app');



