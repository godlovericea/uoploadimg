import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const mobileRoutes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/home'),
        hidden: true
    },
    {
        path: '/upload',
        component: () => import('@/views/home/upload'),
        hidden: true
    },
    {
        path: '/error',
        component: () => import('@/views/home/error'),
        hidden: true
    },
    {
        path: '/test',
        component: () => import('@/views/home/test'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: mobileRoutes
})

export default router
