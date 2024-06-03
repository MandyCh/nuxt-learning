<template>
  <div class="">
    <BaseFooLink :box="true">
      电我回到首页
      <template #extend>
        <div class="app-box">组件插槽内容</div>
      </template>
    </BaseFooLink>
    <h6>约定饮用组件的示例</h6>
    <LazyTheFooter v-if="show" :pdata="20240530"></LazyTheFooter>
    <div v-else>组件懒加载</div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)
setTimeout(() => {
  show.value = true
}, 2000)
</script>

<style scoped lang="scss"></style>
