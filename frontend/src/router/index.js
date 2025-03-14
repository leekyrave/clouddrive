import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '../views/SignupView.vue';
import SigninView from '@/views/SigninView.vue';
import HomeView from '@/views/HomeView.vue';
import UploadView from '@/views/UploadView.vue';
import ListView from '@/views/ListView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: ListView
        },

        {
          path: 'upload',
          component: UploadView
        },

        {
          path: 'edit/:id'
        }
      ]
    },
    
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },

    {
      path: '/signin',
      name: 'signin',
      component: SigninView
    }
  ],
})

export default router
