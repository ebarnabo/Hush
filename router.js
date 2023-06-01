import { createRouter, createWebHistory } from 'vue-router';
import inscription from './src/components/inscription.vue';
import login from './src/components/login.vue';
import validation from './src/components/validation.vue';

const routes = [
  {
    path: '/inscription',
    name: 'Inscription',
    component: inscription
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/validation',
    name: 'Validation',
    component: validation
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
