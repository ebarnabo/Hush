// Import du fichier style scss globale du projet
import './assets/style.scss';

// Import du thème sombre
import { themeMode } from './themeMode';

// Création de l'application Vue
import { createApp } from 'vue';
import App from './App.vue';

// Import du bouton de switch de mode de couleur, il poura être appeler partout avec la balise <ToggleButton />
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



