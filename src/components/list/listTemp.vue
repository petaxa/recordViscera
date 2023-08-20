<script setup lang="ts">
import { getTemp } from '@/lib/sheetapi'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { getTempResType } from '@/lib/sheetapi'

// 1ページのデータ表示数
const COUNT = 20;
// 現在のページ
const page = ref(1)

/**
 * ページを更新
 */
 const updateCurrentPage = (newPage: number) => {
    page.value = newPage
}

// 返ってきたデータ
const res: Ref<getTempResType> = ref({
    "page": "",
    "count": "",
    "allCount": "",
    "data": [{
        "date": "",
        "temp": ""
    }]
})

// 最大ページ
const maxPage = ref(0)

/**
 * スプレッドシートからのデータ取得
 * pageを監視しているwatch内で使う
 * NOTE: ちょっとさすがに関数名を改善したい
 */
const getTempWork = async () => {
    const r = await getTemp(page.value, COUNT)
    res.value = r;
    console.log(r)
}

/**
 * pageを監視してデータを取得
 * NOTE: ページ遷移のたびに同じの読み込むのやだなぁ。どうにかできないかなあ。最悪localhostかなぁ。
 */
watch(page, async () => {
    await getTempWork()
    maxPage.value = Math.trunc(Number(res.value.allCount)/Number(res.value.count))
}, { immediate: true })
</script>
<template>
    <table>
        <thead>
            <tr>
                <th>日付</th>
                <th>体温</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in res?.data" :key="d.date">
                <td>{{ d.date }}</td>
                <td>{{ d.temp }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="updateCurrentPage(page - 1)">&lt;</button>
    <button v-for="n of maxPage" :key="n" @click="updateCurrentPage(n)">{{ n }}</button>
    <button @click="updateCurrentPage(page + 1)">&gt;</button>
</template>

<style scoped>
table {
    text-align: center;
}
</style>