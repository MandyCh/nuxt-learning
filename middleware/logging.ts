
export default defineNuxtRouteMiddleware((to, from) => {

    to.query.reqTime = JSON.stringify(Date.now());

    to.meta.fromUrl = from.fullPath;

})