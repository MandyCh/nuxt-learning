<template>
  <div class="">
    <span>本页面禁用全局默认布局，在此页面内可选择布局：</span>
    <span @click="tap(1)" class="app-margin-left app-cursor">默认布局</span>
    <span @click="tap(2)" class="app-margin-left app-cursor">自定义布局</span>
  </div>
  <NuxtLayout :name="layoutName">
    <div class="app-box">
      <h6>页面内自定义布局和动态更改布局。</h6>
      <BaseFooLink></BaseFooLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false // 页面初始化禁用默认布局
})
const layoutName = ref<'default' | 'custom-first'>('custom-first')
function tap(type: number) {
  if (type === 1) {
    layoutName.value = 'default'
  } else {
    layoutName.value = 'custom-first'
  }
}
</script>

<style scoped lang="scss"></style>
