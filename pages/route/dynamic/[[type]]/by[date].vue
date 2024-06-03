<template>
  <div class="">
    <BaseFooLink></BaseFooLink>

    <div>路由模式之动态路由的示例。</div>
    <div>当前页面路径：~/pages/route/dynamic/[[type]]/by[date].vue</div>
    <div>当前访问路由：{{ $route.fullPath }}</div>
    <div>路由中参数值: type={{ params.type }},date={{ params.date }}</div>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
</script>

<style scoped lang="scss"></style>
