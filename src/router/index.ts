import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

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
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
      meta: { guestOnly: true },
    },
  ],
})

// 路由守卫：已登录用户不能访问登录/注册页面
router.beforeEach((to) => {
  const userStore = useUserStore()
  
  if (to.meta.guestOnly && userStore.isLoggedIn) {
    return '/'
  }
})

export default router
