import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './route/router'
import utils from './assets/js/utils'

Vue.config.productionTip = false
Vue.use(VueRouter);


const router = new VueRouter({
    // mode: 'history',
    routes: routes
})

import io from "socket.io-client";
if (process.env.NODE_ENV === "development") {
    window.socket = io("http://localhost");
} else {
    window.socket = io(`${window.location.origin}`);
}


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        utils.setTitle(to.meta.title)
    }
    next()
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
