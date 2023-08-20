<script setup lang="ts">
import { getTemp } from '@/lib/sheetapi'
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { getTempResType } from '@/lib/sheetapi'
import PageNationButton from './pageNationButton.vue'

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
        "temp": ""
    }]
}

// 返ってきたデータ
const res: Ref<getTempResType> = ref(defaultData)

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
    res.value = defaultData
    await getTempWork()
    // NOTE: これも共通処理だよね。
    maxPage.value = Math.ceil(Number(res.value.allCount) / Number(res.value.count))
}, { immediate: true })
</script>
<template>
    <table>
        <thead>
            <tr>
                <th id="date">日付</th>
                <th id="temp">体温</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="d in res?.data" :key="d.date">
                <td>{{ d.date }}</td>
                <td>{{ d.temp }}</td>
            </tr>
        </tbody>
    </table>

    <PageNationButton :page="page" :max-page="maxPage" @updateCurrentPage="(newPage) => {updateCurrentPage(newPage)}"/>
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

/* セルの個別設定 */
#date {
    width: 30%;
}
</style>