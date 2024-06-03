// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@/assets/css/app.scss'],
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
  }
})
