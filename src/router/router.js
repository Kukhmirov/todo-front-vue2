import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'todo',
            component: () => import('@/components/TheTodoList')
        },
        {
            path: "/todos/:id",
            name: "todo-details",
            component: () => import("@/components/TheTodo")
        },
        {
            path: '/add',
            name: 'add',
            component: () => import('@/components/AddTodo')
        }
    ]
});