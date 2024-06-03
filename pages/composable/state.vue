<template>
  <div class="">
    <BaseFooLink />
    <div>模块化代码示例</div>
    <div>当前颜色useColor:{{ color }}</div>
    <div class="app-cursor" @click="times++">点击次数useTimes: {{ message(times) }}</div>
  </div>
</template>

<script setup lang="ts">
const color = useColor()
const times = useTimes()
const message = strUtils.msg
</script>

<style scoped lang="scss"></style>
