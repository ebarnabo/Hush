import './assets/style.scss'
import { createApp } from 'vue'
import App from './App.vue'
import ToggleButton from './components/btn-mode.vue';

import { createRouter, createWebHashHistory } from 'vue-router'

// Importez vos composants .vue
import Home from './components/inscription.vue'
import Login from './components/login.vue'
import Validation from './components/validation.vue'

// Créez l'instance du routeur et définissez les routes
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/validation', component: Validation },
    //{ path: '/:catchAll(.*)',component: NotFound}
  ]
})


const app = createApp(App)
app.component('ToggleButton', ToggleButton);
app.use(router)
app.mount('#app')