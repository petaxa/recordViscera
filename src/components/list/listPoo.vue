<script setup lang="ts">
import { getPoo } from '@/lib/sheetapi'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { getPooResType } from '@/lib/sheetapi'

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
const res: Ref<getPooResType> = ref({
    "page": "",
    "count": "",
    "allCount": "",
    "data": [{
        "date": "",
        "poo": "",
        "blood": "",
        "drainage": "",
        "notes": "",
    }]
})

// 最大ページ
const maxPage = ref(0)

/**
 * スプレッドシートからのデータ取得
 * pageを監視しているwatch内で使う
 * NOTE: ちょっとさすがに関数名を改善したい
 */
const getPooWork = async () => {
    const r = await getPoo(page.value, COUNT)
    res.value = r;
    console.log(r)
}

/**
 * pageを監視してデータを取得
 * NOTE: ページ遷移のたびに同じの読み込むのやだなぁ。どうにかできないかなあ。最悪localhostかなぁ。
 */
watch(page, async () => {
    await getPooWork()
    maxPage.value = Math.trunc(Number(res.value.allCount)/Number(res.value.count))
}, { immediate: true })
</script>
<template>
    <table>
        <thead>
            <tr>
                <th id="date">日付</th>
                <th id="poo">形状</th>
                <th id="blood">血</th>
                <th id="drainage">粘液</th>
                <th id="notes">備考</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in res?.data" :key="d.date">
                <td>{{ d.date }}</td>
                <td>{{ d.poo }}</td>
                <td>{{ d.blood }}</td>
                <td>{{ d.drainage }}</td>
                <td>{{ d.notes }}</td>
            </tr>
        </tbody>
    </table>
    <button @click="updateCurrentPage(page - 1)">&lt;</button>
    <button v-for="n of maxPage" :key="n" @click="updateCurrentPage(n)">{{ n }}</button>
    <button @click="updateCurrentPage(page + 1)">&gt;</button>
</template>

<style scoped>
table {
    width: 100%;
    /* text-align: center; */
    font-size: 0.6em;
}

/* セルの個別設定 */
#date {
    width: 30%;
}
#poo {
    width: 20%;
}
#blood {
    width: 10%;
}
#drainage {
    width: 10%;
}
#notes {
    width: 20%;
}
</style>