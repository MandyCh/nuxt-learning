<template>
  <div>
    <BaseFooLink></BaseFooLink>
    <h6>动态引入组件</h6>
    <span @click="islink = true">选择链接组件</span>
    <span @click="islink = false">选择页脚组件</span>
    <component :is="islink ? BaseFooLink : TheFooter"></component>
  </div>
</template>

<script setup lang="ts">
const islink = ref(false)

// 这里由于组件全局引入 所以不需要 resolveComponent
const BaseFooLink = 'BaseFooLink' 
// resolveComponent 用于动态引入组件
const TheFooter = resolveComponent('TheFooter')
</script>

<style scoped lang="scss"></style>
