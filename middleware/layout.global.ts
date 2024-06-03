// 路由中间件 Nuxt提供setPageLayout函数允许动态修改页面的布局，以来与Nuxt的上下文context的访问，只能在组件的设置函数，插件和路由中间件中调用
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.indexOf('/component/dynamic') === 0) {
        setPageLayout('custom-first')
    }
})

