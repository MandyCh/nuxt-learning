<template>
  <div>
    <BaseFooLink></BaseFooLink>

    <h6>编程式导航的示例。</h6>

    <div @click="inside" class="app-color-blue app-cursor">访问“通配路由”</div>

    <div @click="outside" class="app-color-blue app-cursor">访问网易</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
/* 官方不建议使用router.push，推荐navigateTo */
const inside = async () => {
  //   router.push({
  //     path: '/route/all/china/gd/sz',
  //     query: {
  //       page: 1
  //     }
  //   })
  await navigateTo({
    path: '/route/all/china/gd/sz',
    query: {
      page: 1
    }
  })
}
const outside = async function () {
  await navigateTo('https://www.163.com', {
    external: true
  })
}
</script>
