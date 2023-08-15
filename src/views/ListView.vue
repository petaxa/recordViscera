<script setup lang="ts">
import { getPoo } from '@/lib/sheetapi'
import { ref, watch } from 'vue';

// 1ページのデータ表示数
const COUNT = 20;
// 現在のページ
const page = ref(1)

// 返ってきたデータ
const res = ref()

// ※ページ遷移のたびに同じの読み込むのやだなぁ。どうにかできないかなあ。最悪localhostかなぁ。
watch(page, async() => {
  const r = await getPoo(page.value, COUNT)
  res.value = r;
}, { immediate: true })
</script>
<template>
  <h1>一覧</h1>
  <p v-for="d in res?.data" :key="d.date">{{ d }}</p>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>