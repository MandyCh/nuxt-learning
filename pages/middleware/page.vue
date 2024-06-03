<template>
  <div>
    <BaseFooLink></BaseFooLink>

    <h6>内联路由中间件的示例。</h6>

    <div>中间件携带数据：{{ $route.meta.welcome }}</div>

    <div>当前页面路由：{{ $route.fullPath }}</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: function (to, from) {
    to.meta.welcome = '匿名路由守卫中间件携带数据'
  }
})
</script>
