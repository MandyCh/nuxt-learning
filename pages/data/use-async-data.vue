<template>
  <div class="">
    <BaseFooLink></BaseFooLink>
    <h6>useAsyncData和useLazyAsyncData（数据获取）的示例。</h6>
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
    <div v-if="resultLoading">详细数据查询中...</div>
    <div v-else-if="resultData">
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
const menuUrl = ref('')
const resultUrl = ref('')
const menuData = ref()
const resultLoading = ref(false) //详细数据获取进度
const resultData = ref()
const errorData = ref()
const pageIndex = ref(1)

const getMenu = async (pageOffset: number) => {
  menuUrl.value = '/api/examples/list?page=' + pageIndex.value
  pageIndex.value += pageOffset
  const uniqueKey = 'vk_' + pageIndex.value //保证不同的请求KEY不同，以请求到数据
  const res = await useAsyncData(uniqueKey, () => $fetch(menuUrl.value, { method: 'GET' }))
  const { data: resData, error: resError } = res
  menuData.value = resData.value
  errorData.value = resError.value
}

const getData = async (id: number) => {
  resultUrl.value = `/api/examples/info?id=${id}&timeout=1000`
  const uniqueKey = 'vk_' + id //保证不同的请求KEY不同，以请求到数据
  const {
    pending,
    data: resData,
    error: resError
  } = useAsyncData(resultUrl.value, () => $fetch(resultUrl.value, { method: 'GET' }), { lazy: true }) //异常请求，等同useLazyAsyncData，不要使用awiat

  //通过pending显示数据加载进度
  resultLoading.value = pending.value
  watch(pending, () => {
    resultLoading.value = pending.value
    resultData.value = resData.value
    errorData.value = resError.value
  })
}

await getMenu(0)
</script>

<style scoped lang="scss"></style>
