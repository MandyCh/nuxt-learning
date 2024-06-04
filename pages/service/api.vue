<template>
  <div class="">
    <BaseFooLink></BaseFooLink>
    <h6>API接口（服务端处理server）的示例。</h6>
    <div>api请求URL：{{ url }}</div>
    <div v-if="resData">
      api请求数据成功：
      <div class="app-box">
        <pre>{{ JSON.stringify(resData, null, 2) }}</pre>
      </div>
    </div>
    <div v-if="resError">
      <div>api请求异常信息：</div>
      <div class="app-box">
        <pre>{{ JSON.stringify(resError, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const url = '/api/hello/mike?type=web'
const { data: resData, error: resError } = await useFetch(url, {
  method: 'POST',
  headers: {
    mode: 'test'
  },
  body: {
    age: 26
  }
})
</script>

<style scoped lang="scss"></style>
