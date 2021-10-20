const login = () => import('@/pages/login/index.vue')
export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: '登录'
        }
    }
]
