<template>
  <div class="">
    <h6>路由模式之嵌套路由示例（子级）。</h6>
    <div>当前页面子文件路径：~/pages/route/nested/child.vue</div>
    <div>当前父级传入的参数：{{ ptype }}</div>
  </div>
</template>

<script setup lang="ts">
const ptype = defineProps(['ptype'])
</script>

<style scoped lang="scss"></style>
