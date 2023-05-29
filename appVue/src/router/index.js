import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [{
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        name:"working",
        path: '/:Ville',
        component: HomeView,
        // props: (route) => ({ ville: route }),
    },
    // {
    //     path: '/:catchAll(.*)',
    //             component: HomeView,

    //   }
]

const router = createRouter({
    // mode: 'history',
    history: createWebHistory(),
    routes
})

export default router