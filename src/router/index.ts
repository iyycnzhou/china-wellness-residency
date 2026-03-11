import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/benefits',
      name: 'benefits',
      component: () => import('../views/Benefits.vue'),
    },
    {
      path: '/membership',
      name: 'membership',
      component: () => import('../views/Membership.vue'),
    },
    {
      path: '/destinations',
      name: 'destinations',
      component: () => import('../views/Destinations.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
  ],
})

export default router
