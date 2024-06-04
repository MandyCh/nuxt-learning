// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/app.scss',],
  // 全局注册组件 
  components: {
    global: true,
    dirs: [
      '~/components',
    ],
  },
  imports: {
    // 配置全子目录支持自动导入
    dirs: [
      "utils/**",
      "composable/**"
    ]
  },
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: { name: 'rotate', mode: 'out-in' },
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
  ],
  routeRules: {
    // '/**': { ssr: false }, //将所有路由ssr关闭，即整个网站为客户端渲染
    // '/navigation/**': { ssr: false }, //匹配的路由为客户端渲染
    // '/navigation/component': { ssr: false }, //匹配的页面为客户端渲染
  },
  // 全局样式
  vite:{
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: '@use "@/assets/css/variable.scss" as *;'
        }
      }
    }
  }
})
