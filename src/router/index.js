import { createRouter, createWebHistory } from 'vue-router';
const LoginView = () => import('../views/LoginView.vue');
const DashboardView = () => import('../views/DashboardView.vue');
const InvoicesView = () => import('../views/InvoicesView.vue');
const MoveFormView = () => import('../views/MoveFormView.vue');
const ProfileView = () => import('../views/ProfileView.vue');
import { getAccessToken } from '@/services/token.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/', component: DashboardView },
    { path: '/fakturor', component: InvoicesView },
    { path: '/flytt', component: MoveFormView },
    { path: '/profil', component: ProfileView },
  ],
});

/* UX guard only.
 Real authorization is enforced by the API.
 This redirects unauthenticated users to /login. */
router.beforeEach((to) => {
  const token = getAccessToken();

  if (to.path === '/login') {
    if (token) {
      return '/';
    }
    return true;
  }

  if (!token) {
    return '/login';
  }

  return true;
});
export default router;
