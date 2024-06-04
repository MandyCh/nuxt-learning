<template>
  <div>
    <BaseFooLink></BaseFooLink>
    <h6>useFetch和useLazyFetch（数据获取）的示例。</h6>
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
const resultUrl = ref('')
const menuData = ref()
const resultData = ref()
const errorData = ref()
const pageIndex = ref(1)

const menuUrl = computed(() => '/api/examples/list?page=' + pageIndex.value)

const res = await useFetch(() => menuUrl.value, { method: 'get' })
const { data: resDataMenu, refresh, error: resErrorMenu } = res
menuData.value = resDataMenu.value
errorData.value = resErrorMenu.value

//通过refresh获取列表，先必须deep watch
watch(
  resDataMenu,
  () => {
    console.log('menuData', resDataMenu.value)
    menuData.value = resDataMenu.value
    errorData.value = resErrorMenu.value
  },
  { deep: true }
)

const getMenu = async (pageOffset: number) => {
  pageIndex.value += pageOffset
  // refresh()
}

//获取详细，客户端渲染

const getData = async (issueId: number) => {
  resultData.value = null
  errorData.value = null
  resultUrl.value = `/api/examples/info?id=${issueId}`
  const uniqueKey = 'vk_' + issueId //保证不同的请求KEY不同，以请求到数据
  const { data: resData, error: resError } = await useFetch(resultUrl.value, {
    key: uniqueKey,
    method: 'GET'
  })
  resultData.value = resData.value
  errorData.value = resError.value
}
</script>
