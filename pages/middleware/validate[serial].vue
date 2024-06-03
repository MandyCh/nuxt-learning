<template>
  <div>
    <BaseFooLink></BaseFooLink>

    <h6>页面路由验证器的示例。</h6>

    <div>当前页面路由：{{ $route.fullPath }}</div>

    <div>
      <NuxtLink to="/middleware/validatemike" target="_blank"> 不符合要求的访问：/middleware/validatemike </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: route => {
    return /^\d+$/.test(route.params.serial.toString())
  }
})
</script>
