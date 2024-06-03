<template>
  <NuxtWelcome />
  <div v-for="(page, index) in pageLinks" :key="index">
    <NuxtLink :to="page.url">{{ page.text }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const pageLinks = [
  {
    url: '/transition/page',
    text: '4.9.1 页面过渡动画'
  }
]
</script>

<style scoped lang="scss"></style>
