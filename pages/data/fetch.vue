<template>
  <div>
    <BaseFooLink></BaseFooLink>
    <h6>$fetch（数据获取）的示例。</h6>
    <div>日期列表api网址：{{ menuUrl }}</div>
    <div>详细数据api网址：{{ resultUrl || '请点击日期' }}</div>
    <div v-if="menuData">
      <div>
        <span>可选日期：</span>
        <span v-for="(item, index) in menuData" :key="index" class="app-margin-right app-color-blue app-cursor" @click="getData(item.id)">
          {{ item.date }}
        </span>
      </div>
      <div>
        <span @click="getMenu(-1)" v-if="pageIndex > 1" class="app-margin-right app-color-blue app-cursor">上页</span>
        <span class="app-margin-right">第{{ pageIndex }}页</span>
        <span @click="getMenu(1)" v-if="menuData && menuData.length > 0" class="app-color-blue app-cursor">下页</span>
      </div>
    </div>
    <div v-if="resultData">
      <div>详细数据：</div>
      <div class="app-box">
        <pre>{{ JSON.stringify(resultData, null, 2) }}</pre>
      </div>
    </div>
    <div v-if="errorData">
      <div>请求异常返回数据：</div>
      <div class="app-box">
        <pre>{{ JSON.stringify(errorData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//本示例访问Nuxt3的server下api，因此不需要指定baseURL

const menuUrl = ref('')
const resultUrl = ref('')
const menuData = ref()
const resultData = ref()
const errorData = ref()
const pageIndex = ref(1)

// 获取列表
const getMenu = async (pageOffset: number) => {
  pageIndex.value += pageOffset
  menuUrl.value = '/api/examples/list?page=' + pageIndex.value
  try {
    const res = await $fetch(menuUrl.value, { method: 'get' })
    menuData.value = res
  } catch (e) {
    errorData.value = e
  }
}

// 获取详细数据 客户端渲染
const getData = async (issueId: number) => {
  resultUrl.value = `/api/examples/info?id=${issueId}`
  try {
    const res = await $fetch(resultUrl.value, { method: 'get' })
    resultData.value = res
  } catch (e) {
    errorData.value = e
  }
}

//初始化加载数据，服务端渲染
await getMenu(0)
</script>
