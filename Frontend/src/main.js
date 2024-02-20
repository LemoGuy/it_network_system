import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import App from './App.vue'
import Dashboard from './pages/Dashboard.vue'
import Login from './pages/Login.vue'

import CreateUser from './pages/users/Create.vue'
import SearchUser from './pages/users/Search.vue'

import CreateSwitch from './pages/switches/Create.vue'
import SearchSwitch from './pages/switches/search.vue'
import MySwitches from './pages/switches/MySwitches.vue'

import CreatePhoto from './pages/switchPhoto/create.vue'
import SearchPhoto from './pages/switchPhoto/Search.vue'
import MyPhotos from './pages/switchPhoto/MySwitchPhotos.vue'

import ForgetPassword from './pages/ForgetPassword.vue'


import { Quasar, Notify } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import { token, setToken } from './services/token'

const routes = [
    {
        path: '/', component: Dashboard,
        meta: { authRequired: true }

    },
    { path: '/login', component: Login },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { authRequired: true }
    },
    {
        path: '/users/create',
        component: CreateUser,
        meta: { authRequired: true }
    },
    {
        path: '/users/search',
        component: SearchUser,
        meta: { authRequired: true }
    },
    {
        path: '/switches',
        component: Dashboard,
        meta: { authRequired: true }
    },
    {
        path: '/switches/create',
        component: CreateSwitch,
        meta: { authRequired: true }
    },
    {
        path: '/switches/search',
        component: SearchSwitch,
        meta: { authRequired: true }
    },
    {
        path: '/switches/my_switches',
        component: MySwitches,
        meta: { authRequired: true }
    },
    {
        path: '/photos',
        component: Dashboard,
        meta: { authRequired: true }
    },
    {
        path: '/photos/create',
        component: CreatePhoto,
        meta: { authRequired: true }
    },
    {
        path: '/photos/search',
        component: SearchPhoto,
        meta: { authRequired: true }
    },
    {
        path: '/photos/my_photos',
        component: MyPhotos,
        meta: { authRequired: true }
    },
    {
        path: '/forget_password',
        component: ForgetPassword,
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})
router.beforeEach((to, from) => {
    if (to.meta.authRequired && !token.value) {
        return "/login";
    }
    return true
})

const app = createApp(App)

app.use(router)
app.use(Quasar, {
    plugins: {
        Notify
    }, // import Quasar plugins and add here
})

app.mount('#app')
