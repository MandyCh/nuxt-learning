<template>
  <div class="">
    <h6>路由模式之嵌套路由的示例（父级）</h6>
    <div>当前页面路由：{{ $route.fullPath }}</div>
    <div>当前页面父文件路径：~/pages/route/nested.vue</div>
    <div class="app-box">
      <!--  显示嵌套子组件内容 -->
      <NuxtPage ptype="demo"></NuxtPage>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
