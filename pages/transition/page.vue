<template>
  <div>
    <BaseFooLink></BaseFooLink>

    <h6>页面过渡之页面自定义过渡名称的示例。</h6>

    <div>页面过渡动画需要在页面间切换才会有效果， 如果使用网址直接访问是没有过渡效果。</div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>
