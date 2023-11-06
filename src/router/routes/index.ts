export default [
    {
        path: '/',
        name: 'Search',
        component: () => import ("@/views/SearchView/index.vue")
    },
    {
        path: "/collect",
        name: "Collect",
        component: () => import("@/views/MyCollect/index.vue")
    }
]