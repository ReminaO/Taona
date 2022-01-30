import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
import Profile from '../views/Profile.vue'
import Contact from '../views/Contact.vue'
import About from '../views/About.vue'
import CGV from '../views/Cgv.vue'
import Tips from '../views/Tips.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil',
    },
  },
  {
    path: '/articles',
    name: 'Products',
    component: Products,
    meta: {
      title: 'Nos Articles',
    },
  },
  {
    path: '/panier',
    name: 'Cart',
    component: Cart,
    meta: {
      title: 'Panier',
    },
  },
  {
    path: '/commandes',
    name: 'Orders',
    component: Orders,
    meta: {
      title: 'Mes Commandes',
    },
  },
  {
    path: '/profil',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Mon Profil',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contactez-nous',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'A Propos',
    },
  },
  {
    path: '/cgv',
    name: 'CGV',
    component: CGV,
    meta: {
      title: 'CGV',
    },
  },
  {
    path: '/astuces',
    name: 'Astuces',
    component: Tips,
    meta: {
      title: 'Astuces',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title
})
export default router
