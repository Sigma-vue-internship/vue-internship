import Vue from "vue";
import VueRouter from "vue-router"
import Home from "../views/Home"
import TaskHistory from "../views/TaskHistory"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/history",
        name: "history",
        component: TaskHistory
    }
]

const router = new VueRouter({
    routes
})

export default router;