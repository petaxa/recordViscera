<script setup lang="ts">
import { getPooCnt } from '@/lib/sheetapi'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { getPooCntResType } from '@/lib/sheetapi'

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

// default data
const defaultData = {
    "page": "",
    "count": "",
    "allCount": "",
    "data": [{
        "date": "",
        "count": ""
    }]
}

// 返ってきたデータ
const res: Ref<getPooCntResType> = ref(defaultData)

// 最大ページ
const maxPage = ref(0)
// 現在のページかどうか
const isCurrentPage = (n: number) => {
    return n === page.value
}

/**
 * スプレッドシートからのデータ取得
 * pageを監視しているwatch内で使う
 * NOTE: ちょっとさすがに関数名を改善したい
 */
const getPooCntWork = async () => {
    res.value = defaultData
    const r = await getPooCnt(page.value, COUNT)
    res.value = r;
    console.log(r)
}

/**
 * pageを監視してデータを取得
 * NOTE: ページ遷移のたびに同じの読み込むのやだなぁ。どうにかできないかなあ。最悪localhostかなぁ。
 */
watch(page, async () => {
    res.value = defaultData
    await getPooCntWork()
    // NOTE: これも共通処理だよね。
    maxPage.value = Math.ceil(Number(res.value.allCount) / Number(res.value.count))
}, { immediate: true })
</script>
<template>
    <table>
        <thead>
            <tr>
                <th id="date">日付</th>
                <th id="count">回数</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in res?.data" :key="d.date">
                <td>{{ d.date }}</td>
                <td>{{ d.count }}</td>
            </tr>
        </tbody>
    </table>

    <!-- NOTE: コンポーネント化できないかなぁ。pageをwatchして、変化させているのがネック -->
    <div class="buttonArea">
        <button v-if="page !== 1" @click="updateCurrentPage(page - 1)">&lt;</button>
        <button v-for="n of maxPage" :key="n" @click="updateCurrentPage(n)" :class="{currentPage: isCurrentPage(n)}">{{ n }}</button>
        <button v-if="page !== maxPage" @click="updateCurrentPage(page + 1)">&gt;</button>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    text-align: center;
    font-size: 0.6em;
}

table tr {
    height: 2.5em;
}

.buttonArea {
    text-align: center;
}

/* 現在ページのボタン */
.currentPage {
    background-color: hsla(160, 100%, 37%, 1);
}

/* セルの個別設定 */
#date {
    width: 30%;
}
</style>