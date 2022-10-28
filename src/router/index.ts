import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import('@/views/shop/index.vue'),
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: () => import('@/views/shopping-cart/index.vue'),
  },
  {
    path: '/order-confirmation/:id',
    name: 'OrderConfirmation',
    component: () => import('@/views/order-confirmation/index.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/orders/index.vue'),
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('@/views/personal/index.vue'),
  },
  {
    path: '/address-list',
    name: 'AddressList',
    component: () => import('@/views/address/list.vue'),
  },
  {
    path: '/update-address',
    name: 'UpdateAddress',
    component: () => import('@/views/address/update.vue'),
  },
  {
    path: '/create-address',
    name: 'CreateAddress',
    component: () => import('@/views/address/create.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    beforeEnter(to: any, from: any, next: any) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
  },
  {
    path: '/',
    redirect: '/home',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to: any, from, next) => {
  const { isLogin } = localStorage
  if (isLogin) {
    next()
    return
  }
  const whiteList = ['Login', 'Register']
  if (whiteList.includes(to.name)) {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router
