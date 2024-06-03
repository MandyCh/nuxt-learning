export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.indexOf('/middleware/middleware') === 0) {
        console.log(to.query.url)
        return navigateTo(to.query.url as string, {
            external: true //允许外部导航
          });
    }
})