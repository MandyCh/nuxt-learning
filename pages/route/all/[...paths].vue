<template>
  <div class="">
    <div>路由模式之通配路由的示例。</div>
    <div>当前页面路径：~/pages/route/all/[...paths].vue</div>
    <div>当前页面路由：{{ $route.fullPath }}</div>
    <div>路由中参数值：{{ $route.params.paths }}</div>
  </div>
  <!-- 输入路由http://localhost:3000/route/all/by20240531/tets/aooo -->
  <!-- paths为[ "by20240531", "tets", "aooo" ]-->
</template>

<script setup lang="ts">

</script>

<style scoped lang='scss'></style>

