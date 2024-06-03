export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.indexOf('/middleware/outside') === 0 && to.query.url ) {
        console.log(to.query.url)
        return navigateTo(to.query.url as string, {
            external: true //允许外部导航
          });
    }
})